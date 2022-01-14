<template>
  <div class="h-full grid grid-cols-2 gap-2">
    <div
      id="canvasParent"
      class="h-full w-full border-solid border-4 border-black"
    >
      <div
        id="p5Canvas"
        class="w-full h-full justify-center items-center flex"
      ></div>
    </div>
    <div class="h-full w-full grid grid-rows-4 grid-cols-2 grid-flow-row gap-2">
      <div
        class="border-solid border-4 border-black container mx-auto px-4 py-4"
      >
        <GlobalDetailsText :gamestate="gamestate"></GlobalDetailsText>
      </div>
      <div class="border-solid border-4 border-black">
        <div class="sm:hidden">
          <label class="sr-only">Select a tab</label>
          <select
            id="tabs"
            v-model="currentTab"
            class="
              block
              w-full
              focus:ring-black focus:border-black
              border-gray-300
              rounded-md
            "
          >
            <option key="Info">
              {{ $t('statsSection.headingInfo') }}
            </option>
            <option key="GlobalStatsMaxEnergy">
              {{ $t('statsSection.headingAvgLife') }}
            </option>
            <option key="GlobalStatsAvgEnergy">
              {{ $t('statsSection.headingAvgEnergy') }}
            </option>
            <option key="GlobalStatsMaxGeneration">
              {{ $t('statsSection.headingAvgGeneration') }}
            </option>
          </select>
        </div>
        <div class="hidden sm:block">
          <nav
            aria-label="Tabs"
            class="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
          >
            <a
              key="Info"
              :aria-current="currentTab === 'Info' ? 'page' : undefined"
              :class="[
                currentTab === 'Info'
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700',
                'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10',
              ]"
              href="#"
              @click="currentTab = 'Info'"
            >
              <span>{{ $t('statsSection.headingInfo') }}</span>
              <span
                :class="[
                  currentTab === 'Info' ? 'bg-black' : 'bg-transparent',
                  'absolute inset-x-0 bottom-0 h-0.5',
                ]"
                aria-hidden="true"
              />
            </a>
            <a
              key="GlobalStatsMaxEnergy"
              :aria-current="
                currentTab === 'GlobalStatsAvgLife' ? 'page' : undefined
              "
              :class="[
                currentTab === 'GlobalStatsAvgLife'
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700',
                'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10',
              ]"
              href="#"
              @click="currentTab = 'GlobalStatsAvgLife'"
            >
              <span>{{ $t('statsSection.headingAvgLife') }}</span>
              <span
                :class="[
                  currentTab === 'GlobalStatsAvgLife'
                    ? 'bg-black'
                    : 'bg-transparent',
                  'absolute inset-x-0 bottom-0 h-0.5',
                ]"
                aria-hidden="true"
              />
            </a>
            <a
              key="GlobalStatsAvgEnergy"
              :aria-current="
                currentTab === 'GlobalStatsAvgEnergy' ? 'page' : undefined
              "
              :class="[
                currentTab === 'GlobalStatsAvgEnergy'
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700',
                'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10',
              ]"
              href="#"
              @click="currentTab = 'GlobalStatsAvgEnergy'"
            >
              <span>{{ $t('statsSection.headingAvgEnergy') }}</span>
              <span
                :class="[
                  currentTab === 'GlobalStatsAvgEnergy'
                    ? 'bg-black'
                    : 'bg-transparent',
                  'absolute inset-x-0 bottom-0 h-0.5',
                ]"
                aria-hidden="true"
              />
            </a>
            <a
              key="GlobalStatsAvgGeneration"
              :aria-current="
                currentTab === 'GlobalStatsAvgGeneration' ? 'page' : undefined
              "
              :class="[
                currentTab === 'GlobalStatsAvgGeneration'
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700',
                'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10',
              ]"
              href="#"
              @click="currentTab = 'GlobalStatsAvgGeneration'"
            >
              <span>{{ $t('statsSection.headingAvgGeneration') }}</span>
              <span
                :class="[
                  currentTab === 'GlobalStatsAvgGeneration'
                    ? 'bg-black'
                    : 'bg-transparent',
                  'absolute inset-x-0 bottom-0 h-0.5',
                ]"
                aria-hidden="true"
              />
            </a>
          </nav>
        </div>
        <div>
          <div v-if="currentTab === 'Info'" class="container mx-auto px-4 py-4">
            <div class="sm:grid sm:grid-cols-2 sm:gap-4 sm:items-start sm:pt-5">
              <div class="mt-1 sm:mt-0">
                {{ $t('statsSection.infoText') }}
              </div>
              <div class="mt-1 sm:mt-0">
                <div
                  class="
                    flex
                    h-full
                    justify-center
                    px-6
                    pt-5
                    pb-6
                    border-2 border-gray-300 border-dashed
                    rounded-md
                  "
                >
                  <div class="space-y-1 text-center">
                    <div class="flex text-sm text-gray-600">
                      <label
                        for="file-upload"
                        class="
                          relative
                          cursor-pointer
                          bg-white
                          rounded-md
                          font-medium
                          text-indigo-600
                          hover:text-indigo-500
                          focus-within:outline-none
                          focus-within:ring-2
                          focus-within:ring-offset-2
                          focus-within:ring-indigo-500
                        "
                      >
                        <span>{{ $t('statsSection.infoSnapshotUpload') }}</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          class="sr-only"
                          @change="onFileChange"
                        />
                      </label>
                    </div>
                    <p class="text-xs text-gray-500">Snapshot JSON</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <GlobalStatsAvgLife
            v-if="currentTab === 'GlobalStatsAvgLife'"
            :colors="colors"
            :creatures="blobs"
            :populations="gamestate._populations"
          ></GlobalStatsAvgLife>
          <GlobalStatsAvgEnergy
            v-if="currentTab === 'GlobalStatsAvgEnergy'"
            :colors="colors"
            :creatures="blobs"
            :populations="gamestate._populations"
          ></GlobalStatsAvgEnergy>
          <GlobalStatsAvgGeneration
            v-if="currentTab === 'GlobalStatsAvgGeneration'"
            :colors="colors"
            :creatures="blobs"
            :populations="gamestate._populations"
          ></GlobalStatsAvgGeneration>
        </div>
      </div>
      <div class="row-span-2 col-span-2 border-solid border-4 border-black">
        <CreatureNetDetail
          v-if="selectedCreature !== undefined"
          :selected-creature="selectedCreature"
        ></CreatureNetDetail>
      </div>
      <div
        class="border-solid border-4 border-black container mx-auto px-4 py-4"
      >
        <CreatureDetailsText
          :colors="colors"
          :creature="selectedCreature"
        ></CreatureDetailsText>
      </div>
      <div class="border-solid border-4 border-black container">
        <CreatureRanking
          :colors="colors"
          :creatures="blobs"
          @selectCreature="setSelectedById"
        ></CreatureRanking>
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
import CreatureDetailsText from '~/components/CreatureDetailsText.vue';
import GlobalDetailsText from '~/components/GlobalDetailsText.vue';
import CreatureNetDetail from '~/components/CreatureNetDetail.vue';
import GlobalStatsAvgEnergy from '~/components/GlobalStatsAvgEnergy.vue';
import CreatureRanking from '~/components/CreatureRanking.vue';
import { GamestateClientDto } from '~/models/dto/gamestate.client.dto';
import GlobalStatsAvgLife from '~/components/GlobalStatsAvgLife.vue';
import GlobalStatsAvgGeneration from '~/components/GlobalStatsAvgGeneration.vue';

let pixel: any;
if (process.browser) {
  pixel = require('@/js/graphic.js');
}

export default Vue.extend({
  name: 'Map',
  components: {
    GlobalStatsAvgGeneration,
    GlobalStatsAvgLife,
    CreatureRanking,
    GlobalStatsAvgEnergy,
    CreatureNetDetail,
    GlobalDetailsText,
    CreatureDetailsText,
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
      colors: ['#F2E205', '#05AFF2', '#F250A9', '#F26E22', '#990FBF'],
      currentTab: 'Info',
      populations: 5,
      gamestate: {} as GamestateClientDto,
      socket: {} as Socket<DefaultEventsMap, DefaultEventsMap>,
    };
  },
  mounted() {
    const P5 = require('p5');

    pixel.setUpdateCurrentSelected(this.setSelected);

    const socket = io(`localhost:5000`, { transports: ['websocket'] }); // http://evosim-server.herokuapp.com
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
    onFileChange(e: any) {
      // TODO: Optimize to disconnect as well
      this.socket.removeAllListeners();
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      const fr = new FileReader();

      fr.onload = (e) => {
        if (e.target !== null && typeof e.target.result === 'string') {
          const result = JSON.parse(e.target.result);
          this.update(result);
        }
      };

      fr.readAsText(files[0]);
    },
  },
});
</script>
