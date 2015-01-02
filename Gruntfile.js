module.exports = function (grunt) {

	grunt.initConfig({

		karma: {
			options: {
				basePath: '',
				files: {

				},
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
			tasks: ['jshint']
		}

	});


	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-traceur');
	grunt.loadNpmTasks('grunt-contrib-watch');


	grunt.registerTask('default', ['concurrent:dev']);
	grunt.registerTask('test', ['jshint', 'karma:ci']);
};
