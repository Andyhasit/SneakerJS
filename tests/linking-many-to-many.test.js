
describe('linking many to many', function() {

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

  it('can link and unlink many to many', function() {

    project1 = newItem('project');
    project2 = newItem('project');
    tag1 = newItem('tag');
    tag2 = newItem('tag');

    expect(model.getProjectTags(project1)).toEqual([]);
    expect(model.getTagProjects(tag1)).toEqual([]);
    expect(model.isProjectLinkedToTag(project1, tag1)).toEqual(false);

    model.addProjectTag(project1, tag2);
    flush();

    expect(model.isProjectLinkedToTag(project1, tag2)).toEqual(true);
    expect(model.getProjectTags(project1)).toEqual([tag2]);
    expect(model.getTagProjects(tag2)).toEqual([project1]);

    model.addProjectTag(project2, tag2);
    flush();

    expect(model.getProjectTags(project1)).toEqual([tag2]);
    expect(model.getProjectTags(project2)).toEqual([tag2]);
    expect(model.getTagProjects(tag2)).toEqual([project1, project2]);

    // Repeat, nothing should change
    model.addProjectTag(project2, tag2);
    flush();

    expect(model.getProjectTags(project1)).toEqual([tag2]);
    expect(model.getProjectTags(project2)).toEqual([tag2]);
    expect(model.getTagProjects(tag2)).toEqual([project1, project2]);

    //Remove
    model.removeProjectTag(project2, tag2);
    flush();

    expect(model.getProjectTags(project1)).toEqual([tag2]);
    expect(model.getProjectTags(project2)).toEqual([]);
    expect(model.getTagProjects(tag2)).toEqual([project1]);

    //Add back
    model.addProjectTag(project2, tag2);
    flush();

    expect(model.getProjectTags(project1)).toEqual([tag2]);
    expect(model.getProjectTags(project2)).toEqual([tag2]);
    expect(model.getTagProjects(tag2)).toEqual([project1, project2]);

  });

});


