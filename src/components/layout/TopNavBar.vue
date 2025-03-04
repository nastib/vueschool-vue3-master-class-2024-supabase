<template>
  <nav class="h-16 border-b bg-muted/40 flex justify-between px-6 items-center">
    <form class="relative w-full h-fit max-w-96">
      <!-- h-fit and absolute top-[50%] translate-y-[-50%] is a tech to center element vertically in relative content-->
      <iconify-icon
        icon="lucide:search"
        class="absolute top-[50%] translate-y-[-50%] left-2.5 text-muted-foreground"
      />
      <Input
        class="pl-8"
        type="text"
        placeholder="Search ..."
      />
    </form>
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@radix-vue"
            />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </nav>
</template>
<script setup lang="ts"></script>
