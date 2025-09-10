import { Fragment, useEffect } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example({
  options,
  label,
  selected,
  setSelected,
  className,
  labelStyle,
}: {
  options: any[];
  label?: string;
  selected?: any;
  setSelected?: any;
  className?: string;
  labelStyle?: string;
}) {
  const people: any[] = options;
  useEffect(() => {
    if (!selected) setSelected(people[0]);

    // eslint-disable-next-line
  }, []);

  return (
    <div className={"block " + className}>
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <Label
              className={
                "block  text-xs font-medium leading-6 text-gray-900 " +
                labelStyle
                  ? labelStyle
                  : " text-xs font-medium text-gray-900 "
              }
            >
              {label}
            </Label>
            <div className="relative">
              <ListboxButton
                className={
                  "relative w-14 cursor-default border border-gray-200 rounded-md p-[4px] px-3 text-left text-gray-900  focus:outline-none text-[10px]  "
                }
              >
                <span className="flex items-center">
                  {/* <img src={selected.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" /> */}
                  <span className="block mx-auto">{selected?.name}</span>
                </span>
              </ListboxButton>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <ListboxOptions className=" absolute  z-10 mt-1 w-full overflow-auto rounded-md bg-[#F8FAFB] text-[10px] select-shadow ring-1 ring-black/5 focus:outline-none text-xs">
                  {people.map((person) => (
                    <ListboxOption
                      key={person.id}
                      className={({ active }) =>
                        classNames(
                          active
                            ? "bg-[#EEF1F6]  text-gray-900"
                            : "text-gray-900",
                          "relative cursor-default p-1 text-[10px] select-none ",
                        )
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex justify-center">
                            {/* <img src={person.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" /> */}
                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "block truncate",
                              )}
                            >
                              {person.name}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-indigo-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4",
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
}
