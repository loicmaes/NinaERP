<script setup lang="ts">
const open = ref(false);

const confirmDelete = async () => await deleteUserAccount();
</script>

<template>
  <AlertDialog
    :open="open"
    @update:open="open = $event"
  >
    <AlertDialogTrigger>
      <slot />
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Es-tu sûr ?</AlertDialogTitle>
        <AlertDialogDescription>Cette action est définitive ! En supprimant ton compte, tu perdras toutes tes données et toute ta progression...</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Annuler</AlertDialogCancel>
        <AlertDialogAction @click="confirmDelete">
          Oui, je supprime
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<style scoped>

</style>
