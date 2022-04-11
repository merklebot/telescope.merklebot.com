<template>
    <div :class="classes">
        <span class="loader-dots" v-if="type === 'dots'">
            <i>.</i>
            <i>.</i>
            <i>.</i>
        </span>

        <span class="loader-circle" v-if="type === 'circle'"></span>

        <span class="loader-ok" v-if="type === 'ok'">✓</span>
    </div>
</template>

<script>

export default {
  name: "Loader",
  props: {
    type: {
        type: String,
        default: 'circle',
        validator: function (value) {
          return ['circle', 'dots', 'ok'].indexOf(value) !== -1;
        }
    },
    size: {
        type: String,
        default: 'small',
        validator: function (value) {
          return ['small', 'medium', 'big'].indexOf(value) !== -1;
        }
    }
  },

  computed: {
    classes() {
      return {
        [`loader`]: true,
        [`loader--${this.size}`]: this.size,
      };
    },
  }
}

</script>

<style scoped>
    @keyframes fadeInDots {
        50% {
            opacity: 1;
        }
    }

    @keyframes fadeOut {
        to {
            opacity: 0;
        }
    }

    @keyframes fadeIn {
        to {
            opacity: 1;
        }
    }

    .loader {
        display: inline-block;
        vertical-align: middle;
    }

    .loader-circle {
        position: relative;
        display: inline-block;
        height: 20px;
        width: 20px;
        border-radius: 20px;
        border-color: var(--color-cyan);
        border-top: 2px solid var(--color-cyan);
        border-right: 2px solid var(--color-cyan);
        opacity: 0;
        animation: 0.8s Rotate ease-in-out infinite, 0.4s cubic-bezier(0.23, 1, 0.320, 1) 0.3s fadeIn forwards;
        margin: 0 var(--space);
    }

    .loader:first-child .loader-circle {margin-left: 0}
    .loader:last-child .loader-circle {margin-right: 0}

    .loader:first-child { margin-left: 0}
    .loader:last-child { margin-right: 0}

    @keyframes Rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .loader-dots {
        --dots-duration: 1.2s;
        --dots-delay: 0.2s;

        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        font: inherit;
    }

    .loader-dots i {
        opacity: 0;
        animation: fadeInDots var(--dots-duration) linear var(--dots-delay) infinite;
    }

    .loader-dots i:nth-child(2) {
        animation-delay: calc(var(--dots-delay) * 2 + var(--dots-duration));
    }

    .loader-dots i:nth-child(3) {
        animation-delay: calc(var(--dots-delay) * 3 + var(--dots-duration) * 2);
    }

    .loader-ok {
        color: var(--color-green);
        font-family: var(--font-highlight);
        font-weight: 900;
        font-size: inherit;
        line-height: 1;
        opacity: 0;
        animation: 0.4s cubic-bezier(0.23, 1, 0.320, 1) 0.3s fadeIn forwards;
    }

    .loader--medium .loader-ok { font-size: 130%; }
    .loader--big .loader-ok { font-size: 160%; }
</style>