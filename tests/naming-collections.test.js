
describe('naming collections', function() {
  
  beforeEach(module('SneakerJS'));
  beforeEach(module('PouchFake'));
  
  beforeEach(inject(function(SneakerModel, _$rootScope_, FakeDb, $q) {
    $rootScope = _$rootScope_;
    var db = new FakeDb();
    model = new SneakerModel(db);
  }));
  
  it('creates accessor functions', function() {
    model.collection('project', ['name']);
    model.collection('task', ['name']);
    ready();
    expect(typeof model.saveItem).toEqual('function');
    expect(typeof model.deleteItem).toEqual('function');
    expect(typeof model.newTask).toEqual('function');
    expect(typeof model.findTasks).toEqual('function');
    expect(typeof model.getTask).toEqual('function');
    expect(typeof model.allTasks).toEqual('function');
    expect(typeof model.newProject).toEqual('function');
    expect(typeof model.findProjects).toEqual('function');
    expect(typeof model.getProject).toEqual('function');
    expect(typeof model.allProjects).toEqual('function');
  });
  
  it('handles plurals', function() {
    model.collection('person', ['name'], {plural: 'people'});
    ready();
    expect(typeof model.newPerson).toEqual('function');
    expect(typeof model.getPerson).toEqual('function');
    expect(typeof model.allPeople).toEqual('function');
    expect(typeof model.findPeople).toEqual('function');
    expect(model.findPersons).toEqual(undefined);
  });
  
});