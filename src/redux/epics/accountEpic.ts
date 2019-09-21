import { ofType, ActionsObservable, combineEpics } from 'redux-observable';
import { AnyAction } from 'redux';
import {  map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import actions from '../actions';

const setAccountBalancesEpic = (
  action$: ActionsObservable<AnyAction>
): Observable<AnyAction> =>
  action$.pipe(
    ofType(actions.SET_MAIN_ACCOUNT),
    map(() => {
      return {
        type: actions.FETCH_BALANCES
      }
    })
  );

const setAccountBeneficiariesEpic = (
    action$: ActionsObservable<AnyAction>
  ): Observable<AnyAction> =>
    action$.pipe(
      ofType(actions.SET_MAIN_ACCOUNT),
      map(() => {
        return {
          type: actions.FETCH_BENEFICIARIES
        }
      })
    );

const setAccountsEpic = (
  action$: ActionsObservable<AnyAction>,
): Observable<AnyAction> =>
  action$.pipe(
    ofType(actions.SET_ACCOUNTS),
    map((action) => {
      return {
        type: actions.SET_MAIN_ACCOUNT,
        payload: action.payload[0]
      }
    })
  );

export default combineEpics(setAccountBalancesEpic, setAccountBeneficiariesEpic, setAccountsEpic);
