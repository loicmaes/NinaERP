<script setup lang="ts">
import { Menu } from "@iconoir/vue";
import { versionToString } from "assets/version";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
</script>

<template>
  <Sheet>
    <SheetTrigger>
      <Button
        variant="ghost"
        size="icon"
      >
        <Menu />
      </Button>
    </SheetTrigger>
    <SheetContent
      class="flex flex-col"
      side="left"
    >
      <SheetHeader>
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>

      <slot />

      <SheetFooter>
        <SheetDescription>{{ versionToString() }}</SheetDescription>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>

<style scoped>

</style>
