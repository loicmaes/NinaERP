<script setup lang="ts">
import { Dashboard, PiggyBank, Neighbourhood, Wallet, User } from "@iconoir/vue";
import AppNavigationLink from "~/components/layouts/app/appNavigation/AppNavigationLink.vue";
</script>

<template>
  <nav class="flex-1 flex flex-col gap-2">
    <!-- <AppNavigationLink to="/portal/personal/overview">
      <Dashboard />
      <span>Vue d'ensemble</span>
    </AppNavigationLink> -->
    <!-- <AppNavigationLink to="/portal/personal/memberships">
      <PiggyBank />
      <span>Mes adhésions</span>
    </AppNavigationLink> -->
    <AppNavigationLink
      to="/portal/personal/associations"
      version="0.2.0"
    >
      <Neighbourhood />
      <span>Mes associations</span>
    </AppNavigationLink>
    <!-- <AppNavigationLink to="/portal/personal/wallets">
      <Wallet />
      <span>Mes wallets</span>
    </AppNavigationLink> -->

    <Separator />

    <AppNavigationLink to="/portal/personal/profile/me">
      <User />
      <span>Mon profil</span>
    </AppNavigationLink>
  </nav>
</template>
