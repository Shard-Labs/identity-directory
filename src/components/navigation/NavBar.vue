<template>
  <div class="flex justify-center">
    <nav-link :exact="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g data-name="Layer 2">
          <g data-name="grid">
            <path
              d="M9 3H5a2 2 0 00-2 2v4a2 2 0 002 2h4a2 2 0 002-2V5a2 2 0 00-2-2zM5 9V5h4v4zM19 3h-4a2 2 0 00-2 2v4a2 2 0 002 2h4a2 2 0 002-2V5a2 2 0 00-2-2zm-4 6V5h4v4zM9 13H5a2 2 0 00-2 2v4a2 2 0 002 2h4a2 2 0 002-2v-4a2 2 0 00-2-2zm-4 6v-4h4v4zM19 13h-4a2 2 0 00-2 2v4a2 2 0 002 2h4a2 2 0 002-2v-4a2 2 0 00-2-2zm-4 6v-4h4v4z"
            />
          </g>
        </g>
      </svg>
      <div class="sm:invisible md:text-base">
        {{ $t("navigation.identities") }}
      </div>
    </nav-link>
    <nav-link  :exact="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g data-name="Layer 2">
          <g data-name="person">
            <path
              d="M12 11a4 4 0 10-4-4 4 4 0 004 4zm0-6a2 2 0 11-2 2 2 2 0 012-2zM12 13a7 7 0 00-7 7 1 1 0 002 0 5 5 0 0110 0 1 1 0 002 0 7 7 0 00-7-7z"
            />
          </g>
        </g>
      </svg>
      <div class="sm:invisible md:text-base">
        {{ $t("navigation.profile") }}
      </div>
    </nav-link>
    <dropdown></dropdown>
  </div>
</template>

<script>
import Dropdown from '../common/Dropdown.vue';
import NavLink from "./NavLink.vue";
export default {
  components: { NavLink, Dropdown }
};
</script>
