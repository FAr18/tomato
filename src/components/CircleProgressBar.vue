<template>
  <svg :width="size" :height="size">
    <circle
      class="progress-rail"
      :r="circleRadius()"
      :cx="radius()"
      :cy="radius()"
      :stroke-width="strokeWidth"
    ></circle>
    <circle
      class="progress-track"
      :r="circleRadius()"
      :cx="radius()"
      :cy="radius()"
      :stroke-width="strokeWidth"
      :stroke-dasharray="strokeDashArray()"
    ></circle>
  </svg>
</template>

<script setup>
const props = defineProps({
  size: {
    type: Number,
    default: 380,
  },
  progress: {
    type: Number,
    default: 34,
  },
  strokeWidth: {
    type: Number,
    default: 5,
  },
});

const radius = () => {
  return props.size / 2;
};

const circleRadius = () => {
  return radius() - props.strokeWidth / 2;
};

const strokeLength = () => {
  return circleRadius() * 2 * Math.PI * (props.progress / 100.0);
};

const strokeDashArray = () => {
  return `${strokeLength()} 99999`;
};
</script>

<style lang="scss" scoped>
svg {
  transform: rotateY(180deg) rotate(-90deg);
}
.progress-rail,
.progress-track {
  fill: #0000;
  stroke: var(--color-main);
}
.progress-rail {
  opacity: 0.3;
}

.progress-track {
  opacity: 1;
  transition: stroke-dasharray 0.5s;
}
</style>
