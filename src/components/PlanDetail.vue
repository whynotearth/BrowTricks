<template>
  <div>
    <BaseCard class="flex justify-center my-1">
      <template #header class="flex justify-between space-x-10 py-2">
        <div
          class="w-full cursor-pointer tg-body-mobile flex items-center focus:shadow-outline outline-none"
          @click="onSelected"
          @keyup.space="onSelected"
          @keyup.enter="onSelected"
        >
          <div
            class="rounded-full h-5 w-5 p-1 border-2 border-gray-500 mr-4"
            :class="{ 'border-secondary': selected === plan.id }"
          >
            <div
              class="h-full w-full rounded-full"
              :class="{ 'bg-secondary': selected === plan.id }"
            ></div>
          </div>
          <span class="text-center text-xl text-gray-700"
            >{{ plan.name }}: {{ formatter.format(plan.price) }} / mo</span
          >
        </div>
      </template>

      <template #content>
        <div class="">
          <p class="text-center text-l text-gray-800">{{ plan.description }}</p>
          <br />
          <ul class="text-left">
            <li v-for="item in plan.features" :key="item.id">
              <svg
                class="inline ml-5"
                viewBox="0 -10 50 50"
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fill-rule="evenodd"
                clip-rule="evenodd"
              >
                <path
                  d="M21 6.285l-11.16 12.733-6.84-6.018 1.319-1.49 5.341 4.686 9.865-11.196 1.475 1.285z"
                /></svg
              >{{ item }}
            </li>
          </ul>
        </div>
      </template>

      <template #footer>
        <span class="text-center cursor-pointer" @click="viewterms = !viewterms"
          >{{ !viewterms ? 'VIEW' : 'CLOSE' }} TERMS AND CONDITIONS</span
        >
        <p v-if="viewterms" class="text-left text-gray-700">
          <br />{{ plan.terms }}
        </p>
      </template>
    </BaseCard>
  </div>
</template>

<script>
export default {
  name: 'plan-detail',
  components: {
    BaseCard: () => import('@/components/BaseCard.vue')
  },
  props: {
    plan: {},
    selected: { type: String }
  },

  data: () => ({
    viewterms: false,
    formatter: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    })
  }),

  methods: {
    onSelected() {
      this.$emit('selected', this.plan);
    }
  }
};
</script>
