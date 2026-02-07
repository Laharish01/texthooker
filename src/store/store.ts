import { BehaviorSubject, Subject } from 'rxjs'

export const newLine$ = new Subject<string>();

export let sockUrl = "ws://localhost:9001";


export const socketState = new BehaviorSubject(-1);