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

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import { Plan } from "@/services/subscriptions";

@Component({
    name: "plan-selector",
    components: {
        PlanDetail: () => import("./PlanDetail.vue")
    }
})
export default class extends Vue {
    @Prop()
    plans?: Plan[];

    @Prop()
    value?: string;

    private planstorage: Plan[] = [];
    private selected = "";

    async mounted() {
        this.planstorage.push(...(this.plans ?? []));
        this.selected = this.value ?? ""
    }

    planSelected(plan: Plan) {
        if (this.selected !== plan.id) {
            this.selected = plan.id;
            this.$emit("input", plan.id);
            console.log(`Selected ${plan.id}`);
        }
    }

    @Watch("value")
    onChange(oldVal: string, newVal: string) {
        this.selected = newVal;
    }
}
</script>