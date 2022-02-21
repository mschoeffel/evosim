<template>
  <div
    class="
      h-screen
      w-full
      flex flex-row flex-wrap
      xl:flex-nowrap
      justify-items-stretch
    "
  >
    <div
      id="canvasParent"
      class="
        h-96
        sm:h-full
        w-full
        xl:basis-1/2
        border-solid border-2 border-black
      "
    >
      <div
        id="p5Canvas"
        class="w-full h-full justify-center items-center"
      ></div>
    </div>
    <div class="w-full h-full xl:basis-1/2 flex flex-col grow shrink">
      <div class="w-full h-80 flex flex-row md:flex-nowrap flex-wrap shrink">
        <div
          class="w-full h-full grow shrink border-solid border-2 border-black"
        >
          <GenerationStatsSections
            :colors="colors"
            :gamestate="gamestate"
          ></GenerationStatsSections>
        </div>
        <div
          class="w-full h-full grow shrink border-solid border-2 border-black"
        >
          <LiveStatsSections
            :colors="colors"
            :figures="figures"
            :populations="gamestate._populations"
          ></LiveStatsSections>
        </div>
      </div>
      <div
        class="
          w-full
          min-h-[20rem]
          md:h-96
          mt-80
          md:mt-0
          flex flex-row
          shrink-0
          grow
        "
      >
        <div
          class="basis-full h-full w-full border-solid border-2 border-black"
        >
          <FigureNetDetail
            v-if="selectedFigure !== undefined"
            :selectedFigure="selectedFigure"
          ></FigureNetDetail>
        </div>
      </div>
      <div
        class="
          w-full
          min-h-[20rem]
          md:min-h-0
          h-80
          flex flex-row
          md:flex-nowrap
          flex-wrap
        "
      >
        <div
          class="
            w-full
            h-96
            sm:h-full
            grow
            shrink
            border-solid border-2 border-black
            overflow-y-auto
          "
        >
          <DetailsSections
            :colors="colors"
            :figure="selectedFigure"
            :gamestate="gamestate"
            @updateSnapshot="updateSnapshot"
          ></DetailsSections>
        </div>
        <div
          class="
            w-full
            h-full
            grow
            shrink
            border-solid border-2 border-black
            overflow-y-auto
          "
        >
          <RankingSections
            :colors="colors"
            :figures="figures"
            @selectFigure="setSelectedById"
          ></RankingSections>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import Vue from 'vue';
import { MapClientDto } from '~/models/dto/map.client.dto';
import { FigureClient } from '~/models/figure.client';
import { FigureClientDto } from '~/models/dto/figure.client.dto';
import { GamestateClientDto } from '~/models/dto/gamestate.client.dto';
import DetailsSections from '~/components/DetailsSections.vue';
import LiveStatsSections from '~/components/LiveStatsSections.vue';
import RankingSections from '~/components/RankingSections.vue';
import GenerationStatsSections from '~/components/GenerationStatsSections.vue';
import FigureNetDetail from '~/components/FigureNetDetail.vue';

let pixel: any;
if (process.browser) {
  pixel = require('@/js/graphic.js');
}

export default Vue.extend({
  name: 'Board',
  components: {
    FigureNetDetail,
    GenerationStatsSections,
    RankingSections,
    LiveStatsSections,
    DetailsSections,
  },
  data(): {
    selectedX: number;
    selectedY: number;
    selectedId: string;
    selectedFigure: FigureClient | undefined;
    map: MapClientDto | undefined;
    figures: Array<FigureClient>;
    p5: {} | undefined;
    colors: Array<string>;
    currentTab: string;
    populations: number;
    gamestate: GamestateClientDto;
    socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  } {
    return {
      selectedX: 0,
      selectedY: 0,
      selectedId: '',
      selectedFigure: undefined,
      map: undefined,
      figures: [],
      p5: undefined,
      colors: ['#F250A9', '#05AFF2', '#F2E205', '#F26E22', '#990FBF'],
      currentTab: 'Info',
      populations: 5,
      gamestate: {} as GamestateClientDto,
      socket: {} as Socket<DefaultEventsMap, DefaultEventsMap>,
    };
  },
  beforeDestroy() {
    this.reset();
  },
  mounted() {
    const P5 = require('p5');
    pixel.setUpdateCurrentSelected(this.setSelected);

    const socket = io(`${this.$config.serverHost}:${this.$config.serverPort}`, {
      transports: ['websocket'],
    });
    this.socket = socket;
    socket.on('connect', () => {
      // DEBUG: console.log("Connected to WebSocket Server!");
      this.p5 = new P5(pixel.main);
      pixel.setPopulationColors(this.colors);

      socket.on(
        'state',
        (payload: {
          map: MapClientDto;
          figures: Array<FigureClientDto>;
          gamestate: GamestateClientDto;
        }) => {
          this.update(payload);
        },
      );
    });

    socket.on('disconnect', () => {
      pixel.clear();
      // DEBUG: console.log("Disconnected from WebSocket Server");
    });
  },
  methods: {
    reset() {
      pixel.clear();
    },
    update(payload: {
      map: MapClientDto;
      figures: Array<FigureClientDto>;
      gamestate: GamestateClientDto;
    }): void {
      this.map = payload.map;
      this.figures = payload.figures.map<FigureClient>((f) =>
        FigureClient.parseFromDto(f),
      );
      this.gamestate = payload.gamestate as GamestateClientDto;

      pixel.updateState(
        this.map,
        this.figures.filter((b) => b.alive),
      );

      if (this.figures.length > 0) {
        if (this.selectedId !== '') {
          this.updateSelectedFigure();
        }
      }
    },
    setSelectedById(id: string) {
      this.selectedId = id;
      this.updateSelectedFigure();
      pixel.setSelectedFigure(id);
    },
    setSelected(x: number, y: number, id: string): void {
      this.selectedX = x;
      this.selectedY = y;
      this.selectedId = id;
      if (id === '') {
        this.selectedFigure = undefined;
      } else {
        this.updateSelectedFigure();
      }
    },
    updateSelectedFigure(): void {
      const t = this.figures.find((f) => f.id === this.selectedId);
      if (t !== undefined) {
        this.selectedFigure = t;
      } else if (this.selectedFigure !== undefined) {
        this.selectedFigure.alive = false;
      }
    },
    roundToTwoDigits(x: number): number {
      return Math.round((x + Number.EPSILON) * 1000) / 1000;
    },
    updateSnapshot(args: any): void {
      this.socket.removeAllListeners();
      this.update(args);
    },
  },
});
</script>
