<script lang="ts" setup>
import { IconoirProvider } from "@iconoir/vue";
import { Toaster } from "~/components/ui/toast";
import { TooltipProvider } from "~/components/ui/tooltip";

await useUser();
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <Toaster />
    <TooltipProvider delay-duration="450">
      <IconoirProvider
        :icon-props="{
          'width': '1rem',
          'height': '1rem',
          'stroke-width': '2',
        }"
      >
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </IconoirProvider>
    </TooltipProvider>
  </div>
</template>
