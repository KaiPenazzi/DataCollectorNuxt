<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="/Home">Home</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="/devices">Devices</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="/actions">Actions</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="/user/login">login</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="/user/register">register</a>
                    </li>
                </ul>
            </div>
        </nav>
        <slot />
    </div>
</template>
  