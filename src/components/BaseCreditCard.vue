<template>
    <div class="flex items-center">
        <img class="w-10 h-10 mr-4" :src="src" :alt="imgalt">
        <div class="text-sm">
            <p class="text-gray-900 leading-none flex justify-left">{{ text }}</p>
            <p class="text-gray-600 leading-none flex justify-left">{{ subtext }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component({
    name: "credit-card"
})
export default class extends Vue {
    @Prop()
    imgsrc?: string;

    @Prop()
    imgalt?: string;

    @Prop()
    text?: string;

    @Prop()
    subtext?: string

    private src = "";

    async mounted() {
        this.src = this.imgsrc ?? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAHYcAAB2HAY/l8WUAAADWSURBVHhe7dAxAQAwEAOh+rcVY7Xwt4ME3jiTFcgKZAWyAlmBrEBWICuQFcgKZAWyAlmBrEBWICuQFcgKZAWyAlmBrEBWICuQFcgKZAWyAlmBrEBWICuQFcgKZAWyAlmBrEBWICuQFcgKZAWyAlmBrEBWICuQFcgKZAWyAlmBrEBWICuQFcgKZAWyAlmBrEBWICuQFcgKZAWyAlmBrEBWICuQFcgKZAWyAlmBrEBWICuQFcgKZAWyAlmBrEBWICuQFcgKZAWyAlmBrEBWICuQFcgKZJ1tH/NTSMi+0zktAAAAAElFTkSuQmCC";
    }
}
</script>