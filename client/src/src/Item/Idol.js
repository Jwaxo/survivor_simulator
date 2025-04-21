
class Idol extends Item {
  type_properties = {
    hidden: false,
    concealable: false,
  };

  constructor(props) {
    super(props);
    this.properties.type = "idol";
  }

}
