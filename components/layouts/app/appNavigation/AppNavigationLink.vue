<script setup lang="ts">
const props = withDefaults(defineProps<{
  to: string;
  exact?: boolean;
}>(), {
  exact: false,
});
const isActive = computed((): boolean => useRoute().path.startsWith(props.to));
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
    </NuxtLink>
  </Button>
</template>

<style scoped>

</style>
