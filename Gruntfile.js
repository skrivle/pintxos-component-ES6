module.exports = function (grunt) {

	grunt.initConfig({

		karma: {
			options: {
				basePath: '',
				files: [
					'node_modules/grunt-traceur/node_modules/traceur/bin/traceur-runtime.js',
					'bower_components/jquery/dist/jquery.js',
					'dist/index.js',
					'test/*.js'
				],
				frameworks: [
					'jasmine'
				]
			},
			dev: {
				browsers: ['Chrome']
			},
			ci: {
				browsers: ['PhantomJS'],
				singleRun: true
			}
		},

		traceur: {
			options: {
				// traceur options here
				experimental: true,
				// module naming options,
				moduleNaming: {
					stripPrefix: "dist/"
				}
			},
			custom: {
				files: {
					'dist/index.js' : 'index.js'
				}
			}
		},

		watch: {
			files: '*.js',
			tasks: ['traceur']
		},

		concurrent: {
			dev: {
				tasks: ['watch', 'karma:dev'],
				options: {
					logConcurrentOutput: true
				}
			}
		}

	});


	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-traceur');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');


	grunt.registerTask('default', ['traceur', 'concurrent:dev']);
	grunt.registerTask('test', ['traceur', 'karma:ci']);
};
