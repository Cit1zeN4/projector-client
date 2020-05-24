<template lang="pug">
    div
        img#header-img(:src="publicPath('img/markus-winkler-Q2J2qQsoYH8-unsplash.jpg')")
        h1.mt-4 {{getCurrentProject.projectName}}        
        p.mt-3 {{getCurrentProject.projectName}}
</template>