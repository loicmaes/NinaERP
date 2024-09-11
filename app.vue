<script lang="ts" setup>
const submitMail = async () => {
  await $fetch("/api/email", {
    method: "POST",
  });
  alert("Email sent!");
};
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <Button
      type="button"
      @click="submitMail"
    >
      Submit new mail
    </Button>
  </div>
</template>
