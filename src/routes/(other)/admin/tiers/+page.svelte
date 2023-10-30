<script>
    import TiersTable from "../TiersTable.svelte"

    export let data
</script>

<TiersTable tiers={data.tiers} users={data.users} />
