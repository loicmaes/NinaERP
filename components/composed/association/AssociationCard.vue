<script setup lang="ts">
import type { Association } from "assets/mock/associations";
import { buildHalfDate } from "~/utils/dates";
import { Badge } from "~/components/ui/badge";

const { association } = defineProps<{
  association: Association;
}>();
</script>

<template>
  <Card>
    <CardHeader class="flex-row items-center gap-4">
      <Avatar
        size="base"
        shape="square"
      >
        <AvatarImage
          v-if="association.avatarURL"
          :src="association.avatarURL"
        />
        <AvatarFallback>{{ association.name.substring(0, 2) }}</AvatarFallback>
      </Avatar>

      <div class="flex flex-col flex-1">
        <CardTitle>{{ association.name }}</CardTitle>
        <CardDescription>Créée le {{ buildHalfDate(new Date(), { fullMonth: true }) }}</CardDescription>
      </div>

      <Button
        variant="outline"
        class="hidden"
        as-child
      >
        <NuxtLink to="/portal/personnal/profile/me">
          Voir la page
        </NuxtLink>
      </Button>
    </CardHeader>
    <CardContent>
      <p class="line-clamp-3">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut dignissimos doloremque doloribus illo ipsa minus numquam perferendis, quia recusandae totam. Assumenda aut beatae consequatur, deserunt eius excepturi nobis quod rem vitae? Alias amet assumenda blanditiis dolor dolorem eligendi eum exercitationem itaque laudantium, maiores molestiae perferendis quam quod repellendus repudiandae saepe sapiente soluta sunt totam ut veniam vero voluptates? Adipisci aliquid animi, assumenda delectus deserunt et eum fuga iste itaque, molestias nam necessitatibus quas reiciendis repellendus voluptas? A ab ad animi deleniti dignissimos ducimus eaque eum fugiat illum inventore, iure labore minima neque obcaecati officia quam quia soluta temporibus tenetur totam ut veniam vitae voluptas voluptatem voluptatibus. Amet dolor expedita, harum, incidunt magnam, minima minus obcaecati porro quis saepe soluta tempore ullam voluptas? Accusantium alias consequuntur, dicta dolorum expedita facere fugit ipsam iure libero numquam, placeat quas quisquam reiciendis rerum sapiente. Accusamus animi aperiam dolores ducimus eligendi expedita laborum, necessitatibus sed!
      </p>
    </CardContent>
    <CardFooter v-if="association.tags?.length">
      <ul class="flex flex-wrap gap-1">
        <li
          v-for="tag in association.tags"
          :key="`tag-${association.id}-${tag}`"
        >
          <Badge variant="secondary">
            {{ tag }}
          </Badge>
        </li>
      </ul>
    </CardFooter>
  </Card>
</template>

<style scoped>

</style>
