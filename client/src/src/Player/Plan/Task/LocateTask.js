import TaskBase from './TaskBase';

class LocateTask extends TaskBase {

  constructor(knowledge_tag, player, storage) {
    super(`locate_${knowledge_tag}`, `Locate ${knowledge_tag}`, player, () => {
      const info = player.getKnowledge(knowledge_tag);

      if (info) {
        this.putInStorage(info);
        return true;
      }
      else {
        return false;
      }
    }, [
      {
        "function": "exists",
        "property": player.getKnowledge(knowledge_tag),
      },
    ], storage);
  }

}

export default LocateTask;
