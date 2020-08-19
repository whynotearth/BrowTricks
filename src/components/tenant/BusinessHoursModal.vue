<template>
  <div class="time-picker-modal" v-if="selectedDayOption">
    <div
      class="absolute w-screen h-screen top-0 left-0 bg-background z-50"
      @click="$emit('closeModal')"
    >
      <div class="sm:flex justify-center items-center h-full">
        <div
          @click.stop
          class="sm:w-128 min-h-full sm:min-h-0 sm:h-160 shadow-2xl sm:border border-background border-opacity-disabled"
        >
          <div class="w-full">
            <div class="px-4 py-2">
              <span class="flex">
                <CloseIcon
                  @click="$emit('closeModal')"
                  class="cursor-pointer text-on-background text-opacity-medium"
                />
              </span>
            </div>
            <div>
              <div
                class="flex justify-between items-center border-b border-on-background border-opacity-divider px-4 pb-4"
              >
                <div
                  class="tg-body-mobile text-on-background text-opacity-high"
                >
                  <h6>
                    We are
                    {{ !selectedDayOption.isClosed ? 'open' : 'closed' }} on
                    <span class="capitalize">{{
                      selectedDayOption.dayOfWeek
                    }}</span>
                  </h6>
                </div>
                <div>
                  <ToggleSwitch v-model="isOpen" />
                </div>
              </div>
            </div>
            <transition name="fade">
              <div v-if="!selectedDayOption.isClosed">
                <div>
                  <div
                    class="grid grid-cols-2 shadow-lg text-on-background uppercase"
                  >
                    <div
                      class="cursor-pointer col-span-1 text-center py-4 text-on-background"
                      :class="
                        isActive === 'open'
                          ? 'border-b-3 border-secondary text-opacity-high'
                          : ' text-opacity-medium'
                      "
                      @click="changeIsActive('open')"
                    >
                      Open
                    </div>
                    <div
                      class="cursor-pointer col-span-1 text-center py-4 text-on-background"
                      :class="
                        isActive === 'close'
                          ? 'border-b-3 border-secondary text-opacity-high'
                          : ' text-opacity-medium'
                      "
                      @click="changeIsActive('close')"
                    >
                      Close
                    </div>
                  </div>
                  <div class="px-12 py-20">
                    <transition name="fade" mode="out-in">
                      <TimePicker
                        key="open"
                        v-if="isActive === 'open'"
                        v-model="selectedDayOption.openingTime"
                        @change="checkTimeDifference"
                      />
                      <TimePicker
                        key="close"
                        v-if="isActive === 'close'"
                        v-model="selectedDayOption.closingTime"
                        @change="checkTimeDifference"
                      />
                    </transition>
                    <div
                      v-if="isClosingBeforeOpening"
                      class="mt-10 text-error text-xs"
                    >
                      <p>
                        Closing time can't be before or as same as opening time!
                      </p>
                      <p>
                        There should be at least 1 hour difference between them.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="px-4 my-4">
                  <Button
                    @clicked="saveHours"
                    class="tg-color-label-mobile rounded-full"
                    :title="`Save ${selectedDayOption.dayOfWeek} Hours`"
                  />
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TimePicker from '@/components/inputs/TimePicker.vue';
import Button from '@/components/Button.vue';
import CloseIcon from '@/assets/icons/close.svg';
import ToggleSwitch from '@/components/inputs/BaseToggleSwitch';

export default {
  name: 'BusinessHoursModal',
  props: {
    selectedDay: {
      required: true
    }
  },
  data() {
    return {
      isActive: 'open',
      isClosingBeforeOpening: false
    };
  },
  components: {
    TimePicker,
    Button,
    CloseIcon,
    ToggleSwitch
  },
  methods: {
    changeIsActive(key) {
      this.isActive = key;
    },
    async saveHours() {
      if (!this.isClosingBeforeOpening) {
        await this.$emit('update:selectedDay', {
          ...this.selectedDay,
          openingTime: this.selectedDayOption.openingTime,
          closingTime:
            this.selectedDayOption.closingTime === '00:00:00'
              ? '23:59:59'
              : this.selectedDayOption.closingTime
        });
        this.$emit('closeModal');
      }
    },
    checkTimeDifference() {
      const [
        openingHour,
        openingMinute
      ] = this.selectedDayOption.openingTime
        .split(':')
        .map(each => Number(each));
      const [
        closingHour,
        closingMinute
      ] = this.selectedDayOption.closingTime
        .split(':')
        .map(each => Number(each));

      this.isClosingBeforeOpening =
        closingHour - openingHour < 1
          ? true
          : closingHour - openingHour === 1 && openingMinute > closingMinute;
    }
  },
  computed: {
    selectedDayOption: {
      get() {
        return this.selectedDay ? { ...this.selectedDay } : null;
      }
    },
    isOpen: {
      get() {
        return this.selectedDay ? !this.selectedDay.isClosed : null;
      },
      set(value) {
        this.$emit('update:selectedDay', {
          ...this.selectedDay,
          isClosed: !value
        });
      }
    }
  },
  watch: {
    selectedDay() {
      this.isActive = 'open';
    }
  }
};
</script>

<style scoped>
.border-b-3 {
  border-bottom-width: 3px;
  border-bottom-style: solid;
}
</style>
