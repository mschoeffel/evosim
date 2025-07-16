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
      <main>
      <div
        id="p5-canvas"
        class="w-full h-full justify-center items-center"
      ></div>
      </main>
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
import { defineComponent } from 'vue';
import { useRuntimeConfig } from 'nuxt/app';
import { MapClientDto } from '~/models/dto/map.client.dto';
import { FigureClient } from '~/models/figure.client';
import { FigureClientDto } from '~/models/dto/figure.client.dto';
import { GamestateClientDto } from '~/models/dto/gamestate.client.dto';
import DetailsSections from '~/components/DetailsSections.vue';
import LiveStatsSections from '~/components/LiveStatsSections.vue';
import RankingSections from '~/components/RankingSections.vue';
import GenerationStatsSections from '~/components/GenerationStatsSections.vue';
import FigureNetDetail from '~/components/FigureNetDetail.vue';
import { nextTick } from 'vue';

export default defineComponent({
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
    pixel: any;
  } {
    return {
      selectedX: 0,
      selectedY: 0,
      selectedId: '',
      selectedFigure: undefined,
      map: undefined,
      figures: [],
      p5: undefined,
      colors: ['#F250A9', '#05AFF2', '#F2E205', '#F26E22', '#990FBF', '#1ABC9C', '#E61919'],
      currentTab: 'Info',
      populations: 5,
      gamestate: {} as GamestateClientDto,
      socket: {} as Socket<DefaultEventsMap, DefaultEventsMap>,
      pixel: undefined,
    };
  },
  beforeDestroy() {
    this.reset();
  },
  mounted() {
    const config = useRuntimeConfig();
    if (!config.public.serverHost || !config.public.serverPort) {
      console.error('Server configuration missing');
      return;
    }
    Promise.all([
      import('p5'),
      import('@/js/graphic.js')
    ]).then(async ([P5Module, pixelModule]) => {
      const P5 = P5Module.default;
      this.pixel = pixelModule;
      this.pixel.setUpdateCurrentSelected(this.setSelected);

      const socket = io(`${config.public.serverHost}:${config.public.serverPort}`, {
        transports: ['websocket'],
      });
      this.socket = socket;
      socket.on('connect', async () => {
        // Initialisiere p5 erst, wenn map und figures gesetzt wurden
        if (!this.map || !this.figures || this.figures.length === 0) {
          // Warte auf ersten State
          socket.once('state', async (payload: {
            map: MapClientDto;
            figures: Array<FigureClientDto>;
            gamestate: GamestateClientDto;
          }) => {
            this.update(payload);
            await nextTick();
            this.p5 = new P5(this.pixel.main);
            //this.pixel.setPopulationColors(this.colors);
            // Jetzt weitere State-Listener aktivieren
            socket.on('state', (payload) => {this.update(payload)});
          });
        } else {
          await nextTick();
          this.p5 = new P5(this.pixel.main);
          //this.pixel.setPopulationColors(this.colors);
          socket.on('state', (payload) => this.update(payload));
        }
      });
      socket.on('disconnect', () => {
        this.pixel.clear();
      });
    });
  },
  methods: {
    reset() {
      if (this.pixel) this.pixel.clear();
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
      if (this.pixel) {
        this.pixel.updateState(
          this.map,
          this.figures.filter((b) => b.alive),
        );
      }
      if (this.figures.length > 0) {
        if (this.selectedId !== '') {
          this.updateSelectedFigure();
        }
      }
    },
    setSelectedById(id: string) {
      this.selectedId = id;
      this.updateSelectedFigure();
      if (this.pixel) this.pixel.setSelectedFigure(id);
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
      // Stelle sicher, dass selectedFigure wirklich ein FigureClient ist
      const t = this.figures.find((f) => f.id === this.selectedId);
      if (t !== undefined && t instanceof FigureClient) {
        this.selectedFigure = t;
      } else {
        this.selectedFigure = undefined;
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
