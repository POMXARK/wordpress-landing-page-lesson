<?php

remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'wp_generator');

show_admin_bar(false);

function logo_widget_init() {
	register_sidebar( array(
		'name'          => 'Логотип SVG',
		'id'            => 'logo',
		'before_widget' => '',
		'after_widget'  => '',
		'before_title'  => '<span class="hidden">',
		'after_title'   => '</span>',
	) );
}
add_action( 'widgets_init', 'logo_widget_init' );

require_once ( get_stylesheet_directory() . '/theme-options.php' );

add_theme_support('post-thumbnails');

add_action( 'graphql_register_types', function() {

  register_graphql_field( 'Post', 'resumePlace', [
    'type' => 'String',
    'description' => __( 'The cost of the post item', 'your-textdomain' ),
    'resolve' => function( $post ) {
      $resumePlace = get_post_meta( $post->ID, 'resume_place', true );
      return ! empty( $resumePlace ) ? $resumePlace : null;
    }
  ] );

    register_graphql_field( 'Post', 'resumeYears', [
      'type' => 'String',
      'description' => __( 'The cost of the post item', 'your-textdomain' ),
      'resolve' => function( $post ) {
        $resumeYears = get_post_meta( $post->ID, 'resume_years', true );
        return ! empty( $resumeYears ) ? $resumeYears : null;
      }
    ] );

} );