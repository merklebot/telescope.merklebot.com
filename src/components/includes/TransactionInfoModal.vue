<template>
  <div class="modal-overlay">
    <div class="modal">
      <h5 v-if="!isFinalized">
        <span class="loader"/>
        <br>
        Transfer sent, waiting for validation....
        <br>
        <b>Please do not close the window.</b>
      </h5>
      <h5 v-else>
        Success!
      </h5>
      <h5 v-if="isCreated && !isIncluded && !isFinalized">
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
        submitted, waiting for inclusion...
      </h5>
      <h5 v-if="isIncluded && !isFinalized">
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
        <a
          :href="
            'https://statemine.subscan.io/block' +
            asIncluded.blockHash
          "
          target="_blank"
        >
          {{ shortWithEllipsis(asIncluded.blockHash) }} </a
        >, waiting for finalization...
      </h5>
      <h5 v-else-if="isFinalized">
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
        <a
          :href="
            'https://statemine.subscan.io/block' +
            asFinalized.blockHash
          "
          target="_blank"
        >
          {{ shortWithEllipsis(asFinalized.blockHash) }} </a
        >. <b>Your STRGZN balance will be updated soon.</b> You may close this window.
      </h5>
      <Button @click.native.prevent="onClose">Close</Button>
    </div>
  </div>
</template>

<script>
import { shortWithEllipsis } from "../../utils/format"

export default {
  name: "TransactionInfoModal",
  components: {
    Button: () => import("./Button.vue"),
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
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.modal {
  text-align: center;
  background-color: #0f0f50;
  height: 500px;
  width: 500px;
  margin-top: 10%;
  padding: 60px 0;
  border-radius: 20px;
}

.close {
  margin: 10% 0 0 16px;
  cursor: pointer;
}

.check {
  width: 150px;
}

h6 {
  font-weight: 500;
  font-size: 28px;
  margin: 20px 0;
}

p {
  font-size: 16px;
  margin: 20px 0;
}
</style>
