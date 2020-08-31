<template>
    <div class="max-w-sm w-full lg:max-w-full flex lg:flex">
        <div class="w-1/4 border-r border-b border-l border-gray-400 lg:border-l lg:border-t lg:border-gray-400 bg-white rounded-lg lg:rounded-lg p-4 flex flex-col justify-between leading-normal">
            <slot name="header"></slot>
            <br />
            <slot name="content"></slot>
            <slot></slot>
            <br />
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component({
    name: "BaseCard"
})
export default class extends Vue {
    
}
</script>