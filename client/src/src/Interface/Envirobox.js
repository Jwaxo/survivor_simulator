function EnviroBox({ scene })  {

  return (
    <div className="enviro-box">
      <strong>{ scene ? scene.getName() : '' }</strong>
      <p>{ scene ? scene.getDescription() : '' }</p>
    </div>
  );

}

export default EnviroBox;
