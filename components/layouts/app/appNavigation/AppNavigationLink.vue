<script setup lang="ts">
import { isExact, isGreater, type Version, versionFromString } from "assets/version";

const props = withDefaults(defineProps<{
  to: string;
  version?: string;
  exact?: boolean;
}>(), {
  exact: false,
});
const isActive = computed((): boolean => useRoute().path.startsWith(props.to));
const targetVersion = computed((): Version | undefined => props.version ? versionFromString(props.version) : undefined);
</script>

<template>
  <Button
    :variant="isActive ? 'default' : 'ghost'"
    class="gap-2 justify-start"
    as-child
  >
    <NuxtLink
      :to="to"
    >
      <slot />
      <template v-if="targetVersion">
        <Badge
          v-if="isGreater(targetVersion)"
          variant="outline"
          class="ml-auto"
        >
          WIP
        </Badge>
        <Badge
          v-if="isExact(targetVersion)"
          class="ml-auto"
        >
          New
        </Badge>
      </template>
    </NuxtLink>
  </Button>
</template>

<style scoped>

</style>
