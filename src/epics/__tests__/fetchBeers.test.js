// local imports
import { searchBeerEpic } from "../fetchBeers";
import { OPTIONS } from "../../reducers/optionsActions";
import { initialState } from "../../reducers/optionsReducer";
import {
  setStatus,
  fetchFulfilled,
  search,
  PENDING,
  fetchFailed
} from "../../reducers/beersActions";
// node modules imports
import { of } from "rxjs";
import { TestScheduler } from "rxjs/testing";

it("produces search actions (success)", function() {
  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });

  testScheduler.run(({ hot, cold, expectObservable }) => {
    // user activate this action of the store:
    const action$ = hot("a", {
      a: search("beer")
    });
    // the current state to pass the function:
    const state$ = of({
      [OPTIONS]: initialState
    });
    // test dependencies
    const dependencies = {
      getJSON: url => {
        // cold obser for dependencies , get: (frame,data)
        return cold("-a", {
          a: [{ name: "Goldstar Beer" }]
        });
      }
    };
    const output$ = searchBeerEpic(action$, state$, dependencies);
    expectObservable(output$).toBe("500ms ab", {
      a: setStatus(PENDING),
      b: fetchFulfilled([{ name: "Goldstar Beer" }])
    });
  });
});

it("produces search actions (failure) ", () => {
  const ts = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });

  ts.run(({ hot, cold, expectObservable }) => {
    const action$ = hot("a", { a: search("beer") });
    const state$ = of({
      [OPTIONS]: initialState
    });
    const dependencies = {
      // here we want to create the error :
      // '#' for error, null for data, and error Obj
      getJSON: url => {
        return cold("-#", null, {
          response: {
            message: "some error text"
          }
        });
      }
    };
    const output$ = searchBeerEpic(action$, state$, dependencies);
    expectObservable(output$).toBe("500ms ab", {
      a: setStatus(PENDING),
      b: fetchFailed({ message: "some error text" })
    });
  });
});
