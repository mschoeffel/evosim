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
      <div
        class="w-full h-96 flex flex-row md:flex-nowrap flex-wrap shrink grow"
      >
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
            :creatures="blobs"
            :populations="gamestate._populations"
          ></LiveStatsSections>
        </div>
      </div>
      <div
        class="
          w-full
          min-h-[20rem]
          xl:min-h-0
          md:h-full
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
          <CreatureNetDetail
            v-if="selectedCreature !== undefined"
            :selected-creature="selectedCreature"
          ></CreatureNetDetail>
        </div>
      </div>
      <div
        class="
          w-full
          min-h-[20rem]
          h-96
          flex flex-row
          md:flex-nowrap
          flex-wrap
          grow
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
            :creature="selectedCreature"
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
            :creatures="blobs"
            @selectCreature="setSelectedById"
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
import { BlobClient } from '~/models/blob.client';
import { BlobClientDto } from '~/models/dto/blob.client.dto';
import CreatureNetDetail from '~/components/CreatureNetDetail.vue';
import { GamestateClientDto } from '~/models/dto/gamestate.client.dto';
import DetailsSections from '~/components/DetailsSections.vue';
import LiveStatsSections from '~/components/LiveStatsSections.vue';
import RankingSections from '~/components/RankingSections.vue';
import GenerationStatsSections from '~/components/GenerationStatsSections.vue';

let pixel: any;
if (process.browser) {
  pixel = require('@/js/graphic.js');
}

export default Vue.extend({
  name: 'Board',
  components: {
    GenerationStatsSections,
    RankingSections,
    LiveStatsSections,
    DetailsSections,
    CreatureNetDetail,
  },
  data(): {
    selectedX: number;
    selectedY: number;
    selectedId: string;
    selectedCreature: BlobClient | undefined;
    map: MapClientDto | undefined;
    blobs: Array<BlobClient>;
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
      selectedCreature: undefined,
      map: undefined,
      blobs: [],
      p5: undefined,
      colors: ['#F250A9', '#05AFF2', '#F2E205', '#F26E22', '#990FBF'],
      currentTab: 'Info',
      populations: 5,
      gamestate: {} as GamestateClientDto,
      socket: {} as Socket<DefaultEventsMap, DefaultEventsMap>,
    };
  },
  mounted() {
    const P5 = require('p5');

    pixel.setUpdateCurrentSelected(this.setSelected);

    const socket = io(`localhost:5000`, { transports: ['websocket'] });
    this.socket = socket;
    socket.on('connect', () => {
      // DEBUG: console.log("Connected to WebSocket Server!");
      this.p5 = new P5(pixel.main);
      pixel.setPopulationColors(this.colors);

      socket.on(
        'state',
        (payload: {
          map: MapClientDto;
          blobs: Array<BlobClientDto>;
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
    update(payload: {
      map: MapClientDto;
      blobs: Array<BlobClientDto>;
      gamestate: GamestateClientDto;
    }): void {
      this.map = payload.map;
      this.blobs = payload.blobs.map<BlobClient>((b) =>
        BlobClient.parseFromDto(b),
      );
      this.gamestate = payload.gamestate as GamestateClientDto;

      pixel.updateState(
        this.map,
        this.blobs.filter((b) => b.alive),
      );

      if (this.blobs.length > 0) {
        if (this.selectedId !== '') {
          this.updateSelectedCreature();
        }
      }
    },
    setSelectedById(id: string) {
      this.selectedId = id;
      this.updateSelectedCreature();
      pixel.setSelectedCreature(id);
    },
    setSelected(x: number, y: number, id: string): void {
      this.selectedX = x;
      this.selectedY = y;
      this.selectedId = id;
      if (id === '') {
        this.selectedCreature = undefined;
      } else {
        this.updateSelectedCreature();
      }
    },
    updateSelectedCreature(): void {
      const t = this.blobs.find((b) => b.id === this.selectedId);
      if (t !== undefined) {
        this.selectedCreature = t;
      } else if (this.selectedCreature !== undefined) {
        this.selectedCreature.alive = false;
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
