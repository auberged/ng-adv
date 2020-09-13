import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FoodService } from './food.service';

describe('Service - HttpTest -FoodService', () => {
  let service: FoodService;
  let controller: HttpTestingController;
  const data = [
    { name: 'Rehgulasch', rating: 2 },
    { name: 'Leberkäse', rating: 2 },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FoodService],
    });

    service = TestBed.inject(FoodService);
    controller = TestBed.inject(HttpTestingController);

    // setup the service mock
    const url = `${environment.api}food`;
    const req = controller.expectOne(url);
    expect(req.request.method).toEqual('GET');

    // flushing down mock data
    req.flush(data);

    // make sure all requests are completed
    controller.verify();

    // set the state
    const fs: any = service;
    fs.setState(data);
  });

  // Verify that there are no pending HTTP requests
  afterEach(() => {
    controller.verify();
  });

  it('should be created and correctly setup', () => {
    expect(service).toBeTruthy();
    // expect(service.getItems()).toBeObservable(of(data));
  });

  it('should return initialized the data', (done) => {
    service.getItems().subscribe((items) => {
      expect(items.length).toEqual(2);
      done();
    });
  });

  it('should create a post in an array', (done) => {
    service.addItem({ name: 'Gulasch', rating: 2 });

    service.getItems().subscribe((items) => {
      expect(items.length).toEqual(3);
      done();
    });
  });

  // it('should return the correct amount of items', (done) => {
  //   service.addItem({ name: 'Gulasch', rating: 2 });
  //   service.addItem({ name: 'Panierter Kabeljau', rating: 3 });

  //   service.getItems().subscribe((items) => {
  //     expect(items.length).toEqual(2);
  //     expect(items[1].name).toEqual('Panierter Kabeljau');
  //     done();
  //   });
  // });

  // it('should have the correct number of items after delete', (done) => {
  //   const gulasch: FoodItem = { name: 'Gulasch', rating: 2 };
  //   service.addItem(gulasch);
  //   service.addItem({ name: 'Panierter Kabeljau', rating: 3 });
  //   service.deleteItem(gulasch);

  //   service.getItems().subscribe((items) => {
  //     expect(items.length).toEqual(1);
  //     expect(items).toEqual([{ name: 'Panierter Kabeljau', rating: 3 }]);
  //     done();
  //   });
  // });
});
