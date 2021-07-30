<template>
  <header class="header" role="banner">
    <div class="header__logo">
      <a href="/"><img alt="dApp logo" src="logo.png"/></a
      ><span>Merklebot</span>
    </div>
    <!-- <div class="header__panel">
      <div>
        <div
          class="account on"
          v-if="$robonomicsModule.isReady && $robonomics.account"
        >
          <div class="account__avatar">
            <Avatar :address="$robonomics.account.address" />
          </div>
          <div class="account__info">
            <div class="address">
              {{ $robonomics.account.address | labelAddress }}
            </div>
            <div class="status">connected</div>
          </div>
        </div>

        <button
          v-if="$robonomicsModule.isReady && !$robonomics.account"
          @click="$web3Module.accessAccount"
        >
          <span class="i-switch"></span><span>Connect account</span>
        </button>
      </div>
      <div class="nav">
        <button
          class="header__panel__settings btn-outline"
          id="mobile-menutoggle"
        >
          <span class="i-menu"></span>
        </button>
      </div>
    </div> -->
  </header>
</template>
