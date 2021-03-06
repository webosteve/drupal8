<?php

/**
 * @file
 * Definition of Drupal\php\Tests\PhpFilterTest.
 */

namespace Drupal\php\Tests;

/**
 * Tests to make sure the PHP filter actually evaluates PHP code when used.
 *
 * @group PHP
 */
class PhpFilterTest extends PhpTestBase {

  /**
   * Makes sure that the PHP filter evaluates PHP code when used.
   */
  public function testPhpFilter() {
    // Log in as a user with permission to use the PHP code text format.
    $php_code_permission = entity_load('filter_format', 'php_code')->getPermissionName();
    $web_user = $this->drupalCreateUser(['access content', 'create page content', 'edit own page content', $php_code_permission]);
    $this->drupalLogin($web_user);

    // Create a node with PHP code in it.
    $node = $this->createNodeWithCode();

    // Make sure that the PHP code shows up as text.
    $this->drupalGet('node/' . $node->id());
    $this->assertText('php print');

    // Change filter to PHP filter and see that PHP code is evaluated.
    $edit = [];
    $edit['body[0][format]'] = $this->phpCodeFormat->id();
    $this->drupalPostForm('node/' . $node->id() . '/edit', $edit, t('Save'));
    $this->assertRaw(t('Basic page %title has been updated.', ['%title' => $node->label()]), 'PHP code filter turned on.');

    // Make sure that the PHP code shows up as text.
    $this->assertNoText('print "SimpleTest PHP was executed!"', "PHP code isn't displayed.");
    $this->assertText('SimpleTest PHP was executed!', 'PHP code has been evaluated.');
  }

}
