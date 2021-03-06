
describe('referential integrity', function() {

  beforeEach(module('SneakerJS'));
  beforeEach(module('PouchFake'));

  beforeEach(inject(function(SneakerModel, _$rootScope_, FakeDb, $q) {
    $rootScope = _$rootScope_;
    var db = new FakeDb();
    model = new SneakerModel(db);

    projectCollection = model.collection('project', ['name']);
    taskCollection = model.collection('task', ['name']);
    tagCollection = model.collection('tag', ['name']);
    taskProjectJoin = model.oneToMany('project', 'task');
    tagProjectJoin = model.manyToMany('project', 'tag');
    model.dataReady();
    flush();

  }));

  it('can set and change parent with one to many', function() {
    project1 = newItem('project');
    project2 = newItem('project');
    task1 = newItem('task');
    task2 = newItem('task');

    expect(model.getTaskProject(task1)).toEqual(null);

    model.setTaskProject(task1, project2);
    model.setTaskProject(task2, project2);
    flush();

    expect(model.getProjectTasks(project1)).toEqual([]);
    expect(model.getProjectTasks(project2)).toEqual([task1, task2]);
    expect(model.getTaskProject(task1)).toEqual(project2);
    expect(model.getTaskProject(task2)).toEqual(project2);

    model.setTaskProject(task2, project1);
    flush();

    expect(model.getProjectTasks(project1)).toEqual([task2]);
    expect(model.getProjectTasks(project2)).toEqual([task1]);
    expect(model.getTaskProject(task1)).toEqual(project2);
    expect(model.getTaskProject(task2)).toEqual(project1);

    model.setTaskProject(task1, null);
    flush();

    expect(model.getProjectTasks(project1)).toEqual([task2]);
    expect(model.getProjectTasks(project2)).toEqual([]);
    expect(model.getTaskProject(task1)).toEqual(null);
    expect(model.getTaskProject(task2)).toEqual(project1);
  });

});


