Config = {}
Config.ApiToken = 'fcad78f7b47383dbd86142952e15c954734be29bcf0380b4db6cb93c6b756d74'
Config.CodePrefix = 'TS'
Config.Categories = {
  {
    name = 'weapon',
    label = 'Vũ Khí',
    args = {
      options = {
        {
          name = 'gun',
          label = 'Súng',
        },
        {
          name = 'melee',
          label = 'Cận chiến',
        },
      },
      icon =
      'data:png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEbUlEQVR4nO2cT4hWVRiHj2U1hpmQoFBkSroIFdtpQUqLMMEWLWyhtQw32tKtMymKG4fwDxbMRgSlVSqD40aQyCAhTEYwiiSMsXBRjc4YTvPEmTkTw8fMee+fc7x3znmf7Qzfufe5597vvL/33M8YRVEURVEURVEUpR0A84GDwB3q8RtwCHi66XNqHcA84CxhOdT0ebUO4FPCM9T0ebUK4ANgPIJomj631gC8CTyMIVlFO4BXgN9jSVbRZkLyIuCGx9FtYKkpiIqeAeBJ4IJH8t/AOlMCFT0DwDGP5DFgmymJiu4A+ER4rO42FVDR0wC2AI88kr8wFVHRDuA14E+P5AFbgpuKqGgzIWGZW0XMxk1gcVXJKtpMSO4Crnok3wNerSM5e9FMBkWnPZL/ATbVlayioccj2WYbO0NIzlo0sEMIiroDjrU0S9HAG0JQ9KV9rAQaaw3wS3aikYOi74BnA431jrBk/NWkCPA8MBgqKBLG2u3KdR8HTKL9vgEhKFobaJyjyJypUwC1FvwnXykommGM54DzguBx15h9wmQYFO0JMMZLwPfCOPYL+COTIkQMiqaNsQG4K0i2FeZbJkWIHBS5MbYDI4LkH4HVJkWAJcBPsYIiV77vLdAdv1Q3kGp7UPRNrKAIeAY4hcznwFMm46Boc8075Yog2K5i9prMg6IPY5XTjuEQS8VWw+QXU5SgqEA5jdv8+LrJICgajREUAR8LS0TLt7ZTY1IGOSi6ViUocvs7PhMET13EIEFUa2Gy7P1BuJ1frPi5+ZbTM8y48yF3FLnPXSGkfGmX0yWDon+B90xJsi+nO7FBUOigqEQ5vcrMdYAFwEnggavgDttKrON/3hVC9eMVipyeAuX0Rds8MCngJHfSPyXbhvPAX6GCIndhbQgvcSyZoN7NLFtZMYvsl4UdRYNlZpzrTtv1r4+xEHl163ArhdkY8fztD2BliXHWChcNdyxbTYoARyjPQ/uuSYkxtgoXFHcRavcQW4uLIO1joijjZXYUubaW1J2+Gqob3mrsG6XAuYKieyKU0wtMLriZfUmQMlREitvP4dtqMHVndIfaoTRncFnDjQIz0ArsClBOV86p5yw2pAG+KiDZKxvYWOA9wXS70xLAfsozMF22e61YKqdvJVFOVwF4v8Z71wOu0tuXdXdaAlgP3KceQ1mV02UBXgB+Ji5jyXenfdi9D8DlyJKHk+9OSwAnIku+k3x3WgLYFVnyiE39TM64Hx2xO4dic9FX1CTBbB0TYLmLNh8X/Z2dmqTwdEykTdsx6DUpInRMYjAoBFHDyYZGBQL2UJxzQVSXJ88eTXazS8WOSRnGXTbyv0CP7D6TKhU6JmV4YPdieMbtdY8LO5P7gIUmZSLJvm2zkYLfE2k+lwO0pyS+zqKn17Dsk/ortXFlP8o6eXtMsu8Bbzd93KnLvm4brE0fbw6rkf6kM4qWye5t+jhzkT2c1Vq4QdmjyWYULZPd1/SxJUeWGUWTZJdRKIqiKIqiKIpiQvIfOSBJ3seBPWUAAAAASUVORK5CYII=',
    },
  },
  {
    name = 'vehicle',
    label = 'Phương Tiện',
    args = {
      options = {
        {
          name = 'xekg',
          label = 'Xe Farm',
        },
        {
          name = 'limited',
          label = 'Xe Limited',
        },
      },
      icon =
      "data:png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEc0lEQVR4nO2cTahVVRTHd5mvtJEghaaZxYOsUMjSgQTmRyUNalCREA0imgRFk+hZYgV+IaEOGlSKTUxQiaAoyiYVvQZ9DCKKsjeQPvDjWdQz0/LdnyxZT67Xs/c595xzzzn7sn5wubz39llnrf/ZZ3+u/ZwzDMMwDMMwDMMwDMMwDMMwDMPoBcClwCWmbrpQ84BHgbXAq8BrwG5gL/AOcEA/XwJfAd8DI8Ah4A/gFDDOhfyvf5v4HNJrRtTGJ8AHeo83gG3Ac8D9wPS+eWjA9cBm4DeaxxngfWCZixVgGrBda1wM7BWfXUwAS4BfiY8R4BYXA8DDwH/Ey1Fg0DUZ4L6ImooQ3wJTXBMBbgD+ytD5fKad41PAE8Bq4EHgXmAFcAewEFigHelcnzG972TtDyY+c/S6QbWzVG0/pPd7FngT+DPF1+2uacjYFhgOOD2uQ7k5Oe0nUtDnK4EtQCvZ+rnfr3BNAngAPzK2XVnQfiIl+f4Mfn5pzEhEa/N3HkdPAovbyk4FXgZ+Bk7r90tp7aFPhYRyee3vCYi9xzUB4O6Ak092iPCFp9xwSIwsQhe0P01rr4/Vrm6ADz3O/QBMaisnNS3EiwWFzm1fr18ZaK+l+Zvl6kIG9wHnHu8oK69xiIMFhc5tv82GzGR9HKhtQQvY4XHqCHBFR1lpM0OcKih0bvttNqboQpaPp13VAFcB/2Z9TTPUuJ8KCp3bfoedWwMzW4n3JlclImbAmasTykvvH2JdQaFz20+43/MBO98AA64KpFnQ5iGJnYHX0jep+byEUUdu+wn3m6TX+FjvqkA6Oo8DrdDql4ohb8JBbVPle12J4+hc9gNLCmOBpYQl3dosc4Lyjy7IdO6C9CMjMhmTqXyvhF5Vd4QN5HfgXWCTbtXdLPubeQWeDewCTtQdVST8DXwKvKIrlIOp43B9RUbr9rwPkKXZj3WENK9T5OnA4bo97EPGdUf+sgmhN9TtUZ+za0Lo0JTUKIdVTpNWjN7ynneyYJTKqAldDS0TuiJM6IowoSvChK4IE7oiTOiKMKErwoSOSGjZDhrSrNDJ+r2mD9a1x8qMyxVMKhdnFnrWuG+LWOyxkuM6NzOUDc68DKVsKLxAnAyVHNdRuWhrAYfmZthpjpGy49ovF83KkMnvI5hoAlxOnAyUGFfrfDOkO9+S69wtVqPTuTAZB5gPfNRlzsaalCcvJ2hjpIy4TgftADOBR4DXgR9TjEnve7vHziJNuImRInF9rcPAa0IPK8nwDOCxQJ70Ce2F5aTUgHYUayMWOW9c476H063g+ymH3a5BAG+VFFc5Z2F0dCJHEIqeWp3pGoTGdaxgXMflzS/TqbsyZN77OAnc6RoIsDyQdJ+GZBEs7YVT92Q4ldrJaNP/lYOe6pWa2Q3HexoXcB3wdgZHWvrvG2a7CACuBfYFOv72uPZVFpec99Bz38Pa/p7R9k6y6TdelOgXCRrXJo3rmMZ1RH+WuG6s20fDMAzDMAzDMAzDMAzDMAzDMAzDMAzDXcxZzHzdOj/j4B0AAAAASUVORK5CYII="
    },
  },
  {
    name = 'clothes',
    label = 'Quần Áo',
    args = {
      options = {
        {
          name = 'mask',
          label = 'Mặt Nạ',
        },
        {
          name = 'hair',
          label = 'Tóc',
        },
        {
          name = 'arms',
          label = 'Tay',
        },
        {
          name = 'leg',
          label = 'Quần',
        },
        {
          name = 'bag',
          label = 'Ba Lô',
        },
        {
          name = 'shoes',
          label = 'Giày',
        },
        {
          name = 'accessory',
          label = 'Phụ Kiện',
        },
        {
          name = 'undershirt',
          label = 'Áo Trong',
        },
        {
          name = 'top',
          label = 'Áo',
        },
        {
          name = 'hat',
          label = 'Mũ',
        },
        {
          name = 'glass',
          label = 'Kính',
        },
        {
          name = 'ear',
          label = 'Phụ Kiện Đeo Tai',
        },
        {
          name = 'watch',
          label = 'Đồng Hồ',
        },
        {
          name = 'bracelet',
          label = 'Vòng Tay',
        },
        {
          name = 'male',
          label = 'Nam',
        },
        {
          name = 'female',
          label = 'Nữ',
        },
      },
      icon =
      'data:png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAACU0lEQVR4nO3cO2sUURjG8afSoFbaBLwhWIpfQCsrCxEb2/gFjO127hQiKbRSUMkXiH4HW8UqtkEFsRAiSC5WQsJfRs8WWXQ2yc6emef4/mCbZS/v+e8wFwZWCiGEEEIIIYQQQggTAXPADeAx8Br4AmzTH9tppnq2R2nWOZufFrgIPAc28bMBPKvXoL4CTgEvgB387aTgJ9UnwDXgK+X5BlxXHwD3gF3KtQssdh15yP/jfleRqxksZrnF+ZZnMN9SW/N1GXnkdgvz3WJ2lkqIXPsOXJpivsvpM2apardq/sgj68CVQ8x3NZ0p5FC5Rx75CTwAju9jthPAw/SenCr3yONXa0+Am8A54Fh6nE/PPU2v6UpVQmQX0x0gI3KG2BE5Q+yInCF2RM4QG7jTzvcEYKEp9IdI1Jq1ptCOd0X6aqMp9KuupyvISlPoeeBT1xMWoG44P+mAeBb42PWkxj4DFxojR+yMkVuIXcLtrUGWyFPEHqb3WdOfNQyyRD5E7N+RSwl9gNjTRz5A7OHY661p71oGWSLvI/aeyKWFbojdfuSx8+yX6Qpy7V/X85jT39e0kNZc381ZmXienAPm5AJzcoE5ucCcXGBOLjAnF5iTC8zJBebkAnNygTm5wJxcYE4uMCcXmJMLzMkF5uQCc3KBObnAnFxgTi4wJxeYkwvMyQXm5AJzcoE5ucCcXGBOLjAnF8APfG3JBfAOX2/lIv27o6u7cgEcBd7jZxU4IifAGbPYq8BpOUpb9mK93+vpAbKe6U29u7DbkkMIIYQQQgghhBDUnV8q8Du8rZWyjAAAAABJRU5ErkJggg==',
    },
  },
  {
    name = 'item',
    label = 'Vật Phẩm',
    args = {
      options = {
        {
          name = 'food',
          label = 'Đồ Ăn',
        },
        {
          name = 'drink',
          label = 'Đồ Uống',
        },
        {
          name = 'other',
          label = 'Khác',
        },
      },
      icon =
      'data:png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAABcklEQVR4nO3cPU4CURhGYSpxCQouUbQTV+hPJS7FQEN1zCRTTMhIdb9XhjnPAvTl5OZCdRcLSZIkSZKkmQJugWfgEzgwPwfgA3gCllWRH4Dv//6kF2TXNak4yUYej93uZPfXhcZtWobu7mSNe28Zev/HPxHsW4bWGYYOMXSIoUMMHWLoqYWWJEnKS/1kunSGDjF0iKFDDB1i6BBDhxg6xNAhUw19BF6AVcOdK2Db/+3mWu089wEqbAv3drGbq9o7HF7hvnDvXcXgqr3D4RVWhXvXFYOr9g6HT+3qeK0YXLV3OLzCsb9L/TIsDj05Uz3Rk2PoEEOHGDrE0CGGDjF0iKFDDB1i6BBDhxg6xNAhhg4xdIihQwwdYugQQ4cYOsTQIYYOMXSIoUMMHWLoKwrt02zwkwjtY4M0fFTwTOjupdm5e0yEXvaPn87VF3BTHnrwxPFuppHXkcgnJ3vT3VdX/gW5B9666yJ2kiVJkiRJkhaX7Rf00oe4UGX7PAAAAABJRU5ErkJggg==',
    },
  }
}

Config.DonateData = {
}

Config.Items = {
  {
    name = "cola",
    label = "eCola",
    category = "item",
    categoryOptions = { "food" },
    description = "",
    price = {
      coin = 10,
      money = 5000
    },
    stock = -1,
  },
  {
    name = "burger",
    label = "Burger",
    category = "item",
    categoryOptions = { "food" },
    description = "",
    price = {
      coin = 20,
      money = 10000
    },
    stock = -1,
  },
  {
    name = "WEAPON_PISTOL",
    label = "Súng Lục",
    category = "weapon",
    categoryOptions = { "gun" },
    description = "",
    price = {
      coin = 100,
    },
    stock = -1,
  },
  {
    name = "t20",
    label = "T20",
    category = "vehicle",
    categoryOptions = { "xekg" },
    description = "",
    price = {
      coin = 100,
    },
    stock = -1,
  },
  {
    name = "top",
    label = "Áo",
    category = "clothes",
    categoryOptions = { "male", "top" },
    description = "",
    price = {
      coin = 100,
    },
    image = "nui://ox_inventory/web/images/top43.png",
    metadata = {
      type = 'clothe',
      slot = 'top',
      drawableId = 1,
      textureId = 0,
      gender = 'male',
      imageurl = "nui://ox_inventory/web/images/top43.png",
    },
    stock = -1,
  },
  {
    name = "top",
    label = "Áo",
    category = "clothes",
    categoryOptions = { "male", "top" },
    description = "",
    price = {
      coin = 100,
    },
    image = "nui://ox_inventory/web/images/top.png",
    metadata = {
      type = 'clothe',
      slot = 'top',
      drawableId = 17,
      textureId = 0,
      gender = 'male',
      imageurl = "nui://ox_inventory/web/images/top.png",
    },
    stock = -1,
  }
}
