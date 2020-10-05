<template>
    <div class="login-form">
        <p class="title">Logg inn</p>
        <div class="field">
        <p class="control has-icons-left">
            <input class="input is-medium" type="email" placeholder="Epost">
            <span class="icon is-small is-left">
            📧
            </span>
        </p>
        </div>
        <div class="field">
        <p class="control has-icons-left">
            <input class="input is-medium" type="password" placeholder="Passord">
            <span class="icon is-small is-left">
            🔒
            </span>
        </p>
        </div>
        <div class="field">
        <p class="control">
            <button class="button is-success is-medium is-fullwidth">
            Login
            </button>
        </p>
        </div>
    </div>
</template>
<style scoped>
.login-form {
    max-width: 50%;
    margin: 0 auto;
}
</style>