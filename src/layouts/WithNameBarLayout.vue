<template>
  <div
    class="page min-h-screen flex flex-col text-on-primary text-opacity-medium"
  >
    <header
      class="bg-primary z-20 shadow-4dp flex flex-row justify-between items-center p-4 sticky top-0"
    >
      <!-- icon -->
      <a class="cursor-pointer" @click.prevent="iconClick" v-if="backRoute">
        <IconBack class="text-on-primary mr-2" />
      </a>
      <div
        class="flex flex-grow justify-center items-center text-center"
        :class="{ 'ml-2': !backRoute }"
        v-click-outside="closeDropDownSheet"
      >
        <div
          class="flex cursor-pointer items-center"
          @click="showDropDownSheet = !showDropDownSheet"
        >
          <h1
            class="tg-h2-mobile text-opacity-high text-left text-on-primary ml-4"
          >
            {{ currentTitle }}
          </h1>
          <ArrowDropDown class="cursor-pointer" />
        </div>
      </div>
      <a class="cursor-pointer self-center">
        <!-- <IconOverflowMenu /> -->
      </a>
    </header>

    <transition
      enter-active-class="transition duration-150 ease-out"
      enter-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <div class="absolute inset-x-0 top-0 mt-12 z-50" v-if="showDropDownSheet">
        <DropDownSheet :tenants="tenants" />
      </div>
    </transition>

    <!-- loading -->
    <div
      v-show="isLoading"
      class="relative flex-grow max-w-6xl mx-auto w-full flex justify-around items-center"
    >
      <BaseSpinner />
    </div>
    <!-- content -->
    <!-- mb-14 for bottom navigation -->
    <div class="relative flex-grow w-full mb-14 pb-6" v-show="!isLoading">
      <MyAccount />
    </div>

    <NavigationBottom v-if="!noNavigation" />
  </div>
</template>

<script>
import IconBack from '@/assets/icons/arrow-back.svg';
import ArrowDropDown from '@/assets/icons/arrow-drop-down.svg';
import { mapGetters } from 'vuex';
import BaseSpinner from '@/components/BaseSpinner';
import MyAccount from '@/views/MyAccount.vue';
import NavigationBottom from '@/components/NavigationBottom';
// import IconOverflowMenu from '@/assets/icons/more.svg';
import DropDownSheet from '@/components/tenant/DropDownSheet.vue';
import { mapActions } from 'vuex';

export default {
  name: 'WithNameBarLayout',
  components: {
    IconBack,
    BaseSpinner,
    NavigationBottom,
    // IconOverflowMenu,
    MyAccount,
    ArrowDropDown,
    DropDownSheet
  },
  data: () => ({
    currentTitle: '',
    isVisible: false,
    name: '',
    backRoute: null,
    showDropDownSheet: false,
    tenants: []
  }),
  mounted() {
    this.isVisible = true;
    this.init();
  },
  computed: {
    ...mapGetters('loading', ['isLoading']),
    noNavigation() {
      return this.$route.matched.some(route => route.meta.noNavigation);
    }
  },
  methods: {
    ...mapActions('tenant', ['fetchUserTenants']),
    init() {
      this.handleBackRoute();
      this._fetchTenants();
      this.handleTitle();
    },
    handleTitle() {
      this.currentTitle = this.$route.meta.title;
    },
    iconClick() {
      this.$router.push(this.backRoute);
    },
    handleBackRoute() {
      this.backRoute = this.$route.meta.backRoute;
      // listen for back route updates
      this.$on('layoutBackRoute', data => {
        this.backRoute = data;
      });
    },
    getName(name) {
      this.name = name;
    },
    _fetchTenants() {
      this.fetchUserTenants().then(tenants => {
        this.tenants = tenants;
      });
    },
    closeDropDownSheet() {
      this.showDropDownSheet = false;
    }
  },
  watch: {
    $route() {
      this.init();
    }
  }
};
</script>
