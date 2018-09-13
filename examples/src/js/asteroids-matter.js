var config = {
  type: Phaser.CANVAS,
  parent: 'phaser-example',
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  physics: {
    default: 'matter',
    matter: {
      debug: false
    }
  }
};

var game = new Phaser.Game(config);

function preload() {

  this.load.image('bullet', 'assets/sprites/shmup-bullet.png');
  this.load.image('ship', 'assets/sprites/thrust_ship.png');
  this.load.scenePlugin('WeaponPlugin', './WeaponPlugin.js', null, 'weapons');

}

function create() {
  console.log(this);

  this.matter.world.setBounds(50, 50, 900, 900);
  this.matter.world.localWorld.bounds = { min: { x: 50, y: 50 }, max: { x: 900, y: 900 } };
  this.matter.world.localWorld.gravity.y = 0;

  //  Creates 30 bullets, using the 'bullet' graphic
  this.weapon = this.weapons.add(30, 'bullet');

  // Enable physics debugging for the bullets
  this.weapon.debugPhysics = true

  //  The bullet will be automatically killed when it leaves the world bounds
  this.weapon.bulletKillType = WeaponPlugin.consts.KILL_WORLD_BOUNDS;
  this.weapon.bulletLifespan = 500;

  //  The speed at which the bullet is fired
  this.weapon.bulletSpeed = 600;

  //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
  this.weapon.fireRate = 100;

  this.sprite = this.add.sprite(400, 300, 'ship');

  this.matter.add.gameObject(this.sprite);
  console.log(this.sprite);

  // this.sprite.body.setDrag(70);
  // this.sprite.body.maxVelocity.set(200);

  //  Tell the Weapon to track the 'player' Sprite
  //  With no offsets from the position
  //  But the 'true' argument tells the weapon to track sprite rotation
  this.weapon.trackSprite(this.sprite, 0, 0, true);

  this.cursors = this.input.keyboard.createCursorKeys();

}

function update() {
  if (this.cursors.up.isDown) {
    /*this.physics.arcade.accelerationFromRotation(this.sprite.rotation, 300, this.sprite.body.acceleration);
    this.sprite.body.acceleration.x

       /* if (speed === undefined) { speed = 60; }
        point = point || new Phaser.Point();

        return point.setToPolar(rotation, speed);*/
    // this.sprite.body.acceleration.setToPolar(this.sprite.rotation, 300)
  } else {
    // this.sprite.body.acceleration.set(0);
  }

  if (this.cursors.left.isDown) {
    Phaser.Physics.Matter.Matter.Body.setAngularVelocity(this.sprite.body, -0.1);
    // this.sprite.body.angularVelocity = -300;
  } else if (this.cursors.right.isDown) {
    // this.sprite.body.angularVelocity = 300;
    Phaser.Physics.Matter.Matter.Body.setAngularVelocity(this.sprite.body, 0.1);
  } else {
    // this.sprite.body.angularVelocity = 0;
    Phaser.Physics.Matter.Matter.Body.setAngularVelocity(this.sprite.body, 0);
  }

  if (this.cursors.space.isDown) {
    console.log('weapon fire')
    this.weapon.fire();
  }

  // this.matter.world.wrap(this.sprite, 16);
}
