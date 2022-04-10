<template>
  <div class="modal-overlay">
    <div class="modal">
      <div v-if="!isFinalized">
        <p>
          <Loader />
        </p>

        <h4>Transfer sent</h4>
        <p class="text-small">Waiting for validation <Loader type="dots"/></p>
        <p class="text-small">Please do not close the window.</p>
      </div>
      <div v-else>
        <h4>Success!</h4>
      </div>

      <div v-if="isCreated && !isIncluded && !isFinalized">
        <p><Loader /></p>

        <h4>
          Transaction
          <a
            :href="
              'https://statemine.subscan.io/extrinsic/' +
              asCreated.extrinsicHash
            "
            target="_blank"
          >
            {{ shortWithEllipsis(asCreated.extrinsicHash) }}
          </a>
          submitted
        </h4>

        <p class="text-small">Waiting for inclusion <Loader type="dots"/></p>
        <p class="text-small">Please do not close the window.</p>
      </div>

      <div v-if="isIncluded && !isFinalized">
        <p><Loader /></p>

        <h4>
          Transaction
          <a
            :href="
              'https://statemine.subscan.io/extrinsic/' +
              asIncluded.extrinsicHash
            "
            target="_blank"
          >
            {{ shortWithEllipsis(asIncluded.extrinsicHash) }}
          </a>
          included in block
        </h4>

        <p class="text-small">
          <a
            :href="
              'https://statemine.subscan.io/block' +
              asIncluded.blockHash
            "
            target="_blank"
          >
            {{ shortWithEllipsis(asIncluded.blockHash) }} </a
          >, waiting for finalization...
        </p>
        <p class="text-small">Please do not close the window.</p>
      </div>

      <div v-else-if="isFinalized">
        <p>
          <Loader type="ok" size="medium" />
        </p>

        <h4>
          Transaction
          <a
            :href="
              'https://statemine.subscan.io/extrinsic/' +
              asFinalized.extrinsicHash
            "
            target="_blank"
          >
            {{ shortWithEllipsis(asFinalized.extrinsicHash) }}
          </a>
          finalized at block
        </h4>

        <p class="text-small">
          <a
            :href="
              'https://statemine.subscan.io/block' +
              asFinalized.blockHash
            "
            target="_blank"
          >
            {{ shortWithEllipsis(asFinalized.blockHash) }} </a
          >
        </p>
        <p class="text-small">
          Your STRGZN balance will be updated soon. You may close this window.
        </p>
      </div>

      <Button @click.native.prevent="onClose" round size="small" aria-label="close modal" class="modal-close">&#10006;</Button>
    </div>
  </div>
</template>

<script>
import { shortWithEllipsis } from "../../utils/format"

export default {
  name: "TransactionInfoModal",
  components: {
    Button: () => import("./Button.vue"),
    Loader: () => import("./Loader.vue"),
  },
  props: {
    isCreated: {
      type: Boolean,
      default: false,
    },
    asCreated: {
      type: Object,
      default: function () {
        return {
          extrinsicHash: null,
        }
      },
    },
    isIncluded: {
      type: Boolean,
      default: false,
    },
    asIncluded: {
      type: Object,
      default: function () {
        return {
          blockHash: null,
          extinsicHash: null,
        };
      },
    },
    isFinalized: {
      Boolean,
      default: false,
    },
    asFinalized: {
      type: Object,
      default: function () {
        return {
          blockHash: null,
          extrinsicHash: null,
        };
      },
    },
  },
  methods: {
    onClose() {
      this.$emit("closed");
    },
    shortWithEllipsis,
  },
};
</script>

<style scoped>

.modal-overlay {
  position: fixed;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000da;
}

.modal {
  background-color: var(--color-blue-mid);
  border: 2px solid var(--color-lilac);
  width: 80%;
  max-width: 400px;
  border-radius: 20px;
  padding: var(--padding);
  position: relative;
}

.modal-close {
  position: absolute;
  top: -1rem;
  right: -1rem;
}
</style>
