<template>
  <div>
    <PlanDetail
      v-for="plan in planstorage"
      :key="plan.id"
      :plan="plan"
      :selected="selected"
      @selected="planSelected"
    ></PlanDetail>
  </div>
</template>

<script>
export default {
  name: 'plan-selector',
  components: {
    PlanDetail: () => import('./PlanDetail.vue')
  },
  props: {
    plans: {
      type: Array
    },
    value: {
      type: String
    }
  },

  data: () => ({
    planstorage: [],
    selected: ''
  }),

  async mounted() {
    this.planstorage.push(...(this.plans ?? []));
    this.selected = this.value ?? '';
  },

  methods: {
    planSelected(plan) {
      if (this.selected !== plan.id) {
        this.selected = plan.id;
        this.$emit('input', plan.id);
        console.log(`Selected ${plan.id}`);
      }
    }
  },
  watch: {
    value(newVal) {
      this.selected = newVal;
    }
  }
};
</script>
