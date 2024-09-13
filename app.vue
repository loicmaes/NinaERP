<script lang="ts" setup>
import { IconoirProvider } from "@iconoir/vue";
import { Toaster } from "~/components/ui/toast";
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <Toaster />
    <IconoirProvider
      :icon-props="{
        'width': '1rem',
        'height': '1rem',
        'stroke-width': '1.5',
      }"
    >
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </IconoirProvider>
  </div>
</template>
