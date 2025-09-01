"use client"

import * as React from "react"

import { useTheme } from "next-themes"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <Select onValueChange={(value) => setTheme(value)}>
      <SelectTrigger>
        <SelectValue placeholder="Escolha o tema do app" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Claro</SelectItem>
        <SelectItem value="dark">Escuro</SelectItem>
        <SelectItem value="teia">Teia Connect</SelectItem>
      </SelectContent>
    </Select>
  )
}
