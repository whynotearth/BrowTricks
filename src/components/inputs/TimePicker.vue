<template>
  <div class="example-page">
    <div class="flex items-center tg-h3-mobile">
      <smooth-picker
        class="w-full mx-4"
        ref="timePickerHour"
        :data="hours"
        :change="dataChange"
        id="timePickerHour"
        :key="timePickerHour"
        @hook:mounted="wheelEvent('timePickerHour', 'hours')"
        @hook:beforeDestroy="removeWheelEvent('timePickerHour')"
      />
      <span class="font-bold"> : </span>
      <smooth-picker
        class="w-full mx-4"
        ref="timePickerMin"
        :data="mins"
        :change="dataChange"
        id="timePickerMin"
        :key="timePickerMin"
        @hook:mounted="wheelEvent('timePickerMin', 'mins')"
        @hook:beforeDestroy="removeWheelEvent('timePickerMin')"
      />
      <smooth-picker
        class="w-full mx-4"
        ref="timePickerTime"
        :data="time"
        :change="dataChange"
        id="timePickerTime"
        :key="timePickerTime"
        @hook:mounted="wheelEvent('timePickerTime', 'time')"
        @hook:beforeDestroy="removeWheelEvent('timePickerTime')"
      />
    </div>
  </div>
</template>

<script>
import { timeFormat, extractTimeFrom24H, randomId } from '@/helpers.js';

export default {
  name: 'TimePicker',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      hours: [
        {
          currentIndex: 7,
          list: this.hoursArr
        }
      ],
      mins: [
        {
          currentIndex: 0,
          list: this.minsArr
        }
      ],
      time: [
        {
          currentIndex: 0,
          list: ['AM', 'PM']
        }
      ],
      timePickerHour: this.randomId(),
      timePickerMin: this.randomId(),
      timePickerTime: this.randomId()
    };
  },
  created() {
    this.hours[0].list = this.setHours();
    this.mins[0].list = this.setMins();

    let { hour: getHour, min: getMin, postfix } = this.extractTimeFrom24H(
      this.value
    );

    if (this.value === '23:59:59') {
      getHour = '12';
      getMin = '00';
      postfix = 'AM';
    }

    this.hours[0].currentIndex = this.hours[0].list.findIndex(
      hour => hour === String(getHour)
    );
    this.mins[0].currentIndex = this.mins[0].list.findIndex(
      min => min === String(getMin)
    );
    this.time[0].currentIndex = this.time[0].list.findIndex(t => t === postfix);
  },
  methods: {
    setTimeToModel() {
      const hourPicker =
        this.$refs.timePickerHour &&
        this.$refs.timePickerHour.getCurrentIndexList();
      const minPicker =
        this.$refs.timePickerMin &&
        this.$refs.timePickerMin.getCurrentIndexList();
      const timePicker =
        this.$refs.timePickerTime &&
        this.$refs.timePickerTime.getCurrentIndexList();

      const hour = this.hours[0].list[hourPicker];
      const min = this.mins[0].list[minPicker];
      const postfix = this.time[0].list[timePicker];

      if (hour && min && postfix) {
        const time = `${hour}:${min} ${postfix}`;

        return this.timeFormat(time, '24h');
      }
    },
    dataChange() {
      const time = this.setTimeToModel();
      if (time) {
        this.$emit('change', time);
      }
    },
    setHours() {
      const hoursArr = [];
      for (let i = 1; i <= 12; i++) {
        hoursArr.push(i < 10 ? `0${i}` : `${i}`);
      }
      return hoursArr;
    },
    setMins() {
      const minsArr = [];
      for (let i = 0; i < 60; i += 5) {
        minsArr.push(i < 10 ? `0${i}` : `${i}`);
      }
      return minsArr;
    },
    wheelEvent(id, arr) {
      document.getElementById(id).addEventListener('wheel', e => {
        let index = this[arr][0].currentIndex;
        const listLength = this[arr][0].list.length;

        if (e.deltaY < 0) {
          index = index <= 0 ? 0 : index - 1;
        } else if (e.deltaY > 0) {
          index = index >= listLength - 1 ? listLength - 1 : index + 1;
        }

        this[arr][0].currentIndex = index;
        this[id] = this.randomId();
      });
    },
    timeFormat,
    extractTimeFrom24H,
    randomId,
    removeWheelEvent(id) {
      if (document.getElementById(id)) {
        document
          .getElementById(id)
          .removeEventListener('wheel', this.dataChange());
      }
    }
  }
};
</script>
<style>
.smooth-picker {
  font-size: 1rem;
  height: 10em;
  position: relative;
  background-color: #fff;
  overflow: hidden;
}
.smooth-picker .smooth-list {
  height: 6.25em;
  position: relative;
  top: 4em;
}
.smooth-picker .smooth-item {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  text-align: center;
  will-change: transform;
  contain: strict;
  height: 2em;
  line-height: 2;
  font-size: 1em;
}
.smooth-picker .smooth-handle-layer {
  position: absolute;
  width: 100%;
  height: calc(100% + 2px);
  left: 0;
  right: 0;
  top: -1px;
  bottom: -1px;
}
.smooth-picker .smooth-handle-layer .smooth-top {
  border-bottom: 1px solid #c8c7cc;
  background: linear-gradient(180deg, #fff 10%, hsla(0, 0%, 100%, 0.7));
  -webkit-transform: translateZ(5.625em);
  transform: translateZ(5.625em);
}
.smooth-picker .smooth-handle-layer .smooth-middle {
  height: 2em;
}
.smooth-picker .smooth-handle-layer .smooth-bottom {
  border-top: 1px solid #c8c7cc;
  background: linear-gradient(0deg, #fff 10%, hsla(0, 0%, 100%, 0.7));
  -webkit-transform: translateZ(5.625em);
  transform: translateZ(5.625em);
}
.flex-box {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}
.flex-box.direction-column {
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}
.flex-box.direction-row {
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
}
.flex-box .flex-1 {
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.flex-box .flex-2 {
  -webkit-flex: 2;
  -ms-flex: 2;
  flex: 2;
}
.flex-box .flex-3 {
  -webkit-flex: 3;
  -ms-flex: 3;
  flex: 3;
}
.flex-box .flex-4 {
  -webkit-flex: 4;
  -ms-flex: 4;
  flex: 4;
}
.flex-box .flex-5 {
  -webkit-flex: 5;
  -ms-flex: 5;
  flex: 5;
}
.flex-box .flex-6 {
  -webkit-flex: 6;
  -ms-flex: 6;
  flex: 6;
}
.flex-box .flex-7 {
  -webkit-flex: 7;
  -ms-flex: 7;
  flex: 7;
}
.flex-box .flex-8 {
  -webkit-flex: 8;
  -ms-flex: 8;
  flex: 8;
}
.flex-box .flex-9 {
  -webkit-flex: 9;
  -ms-flex: 9;
  flex: 9;
}
.flex-box .flex-10 {
  -webkit-flex: 10;
  -ms-flex: 10;
  flex: 10;
}
.flex-box .flex-11 {
  -webkit-flex: 11;
  -ms-flex: 11;
  flex: 11;
}
.flex-box .flex-12 {
  -webkit-flex: 12;
  -ms-flex: 12;
  flex: 12;
}
</style>

<style scoped>
/deep/ .smooth-picker {
  background-color: transparent;
  font-size: inherit;
}

/deep/ .smooth-picker .smooth-middle,
/deep/ .smooth-picker .smooth-top,
/deep/ .smooth-picker .smooth-bottom {
  @apply cursor-pointer;
}

/deep/ .smooth-picker .smooth-handle-layer .smooth-bottom,
/deep/ .smooth-picker .smooth-handle-layer .smooth-top {
  background: transparent;
  border-bottom: none;
  border-top: none;
}

/deep/ .smooth-picker .smooth-item {
  color: black !important;
  opacity: 0.38 !important;
}

/deep/ .smooth-picker .smooth-item-selected {
  color: black !important;
  opacity: 0.84 !important;
}

/deep/ .smooth-picker .smooth-middle {
  border-width: 0.15rem 0 0.15rem 0 !important;
  border-color: #0c6986 !important;
  border-style: solid !important;
}
</style>
