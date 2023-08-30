import { NavigationBehaviorOptions } from "@angular/router"

type LinkAction = {
  type: "action",
  name: String,
  classes: string[],
  url: string,
  data: any,
  behavior: NavigationBehaviorOptions
}

export type ButtonAction = {
  type: "button",
  action: (any?) => any,
  name: String,
  classes: string[],
  data: any
}

export type ActionDescriptor = ButtonAction | LinkAction