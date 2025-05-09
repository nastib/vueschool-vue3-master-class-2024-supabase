<script setup lang="ts">
const { setError } = useErrorStore()
setError({ message: 'Page not found', customCode: 404 })
</script>
