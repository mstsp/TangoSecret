<template>
  <header class="header">
    <img src="../../assets/images/logo.svg" alt="Logo of Tango Secret">
    <div class="header__menu-nav">
      <nav class="header__nav">
        <ul class="header__menu">
          <li class="header__menu-item" v-for="item in menuData" :key="item">
            <span>
              {{item.title}}
            </span>
          </li>
        </ul>
      </nav>
      <Dropdown title="UK"/>

      <span class="header__icon-burger icon-burger"></span>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Dropdown from "@/components/dropdown/Dropdown.vue";

export default defineComponent({
  name: "Header",
  components: {
    Dropdown
  },
  setup() {
    const menuData = [
      {
        title: "про нас"
      },
      {
        title: "розклад"
      },
      {
        title: "ціни"
      },
      {
        title: "запитання"
      },
      {
        title: "контакти"
      },

    ]

    const languages = ["UK", 'RU', "EN"]

    return {
      menuData,
      languages
    }
  }
});
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 12px 20px;
}

.header__menu-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 798px;
  width: 100%;
  padding-left: 62px;
  padding-right: 69px;
  font-family: 'Oswald Medium', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  padding-top: 8px;
}

.header__menu {
  display: flex;
}

.header__menu-item {
  position: relative;
  text-transform: uppercase;
  margin: 0 25px;
  cursor: pointer;
  user-select: none;


  span:after {
    content: "";
    display: block;
    margin: auto;
    height: 2px;
    width: 0;
    bottom: -2px;
    background: transparent;
    transition: all 0.3s;
  }

  span:hover:after {
      width: 100%;
      background-color: #ED1515;
      box-shadow: 0px 0px 4px 1px #ED1515;
  }
}

.header__icon-burger {
  display: none;
  //color: white;
  font-size: 15px;
}

.select {
  background-color: transparent;
}

@media (max-width: 1200px) {
  .header__menu-nav {
    justify-content: flex-end;
    padding-left: 0;
    padding-right: 0;
  }

  .header__nav {
    display: none;
  }

  .header__icon-burger {
    display: block;
    margin-left: 42px;
  }
}
</style>

