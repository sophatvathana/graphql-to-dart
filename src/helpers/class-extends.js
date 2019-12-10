import { toPascalCase } from "@graphql-codegen/plugin-helpers";
import fragmentClassNames from "./fragment-class-names";

const builtinInterfaces = [
  /*"ToJson"*/
];

// apply whatever inheritence keyword
function inherit(inheritanceKeyword, ..._parents) {
  const parents = _parents.filter(p => p);
  if (parents.length == 0) {
    return "";
  }
  return `${inheritanceKeyword} ${parents.map(toPascalCase).join(", ")} `;
}

// TODO inline fragment "onType" support
// we extend from interfaces in dart to allow functionality
// piggybacking via replaceTypes
// TODO base type / entity modeling
//   should be done via postgraphile plugin
//   right now we replace Node with Entity, which is hacky
//   ex. Query becomes an "Entity"
export default function classExtends({
  hash: { baseType, mixins = [], fragments = [], interfaces = [], replace = {} }
}) {
  return (
    inherit("extends", baseType) +
    inherit("with", ...mixins, ...fragmentClassNames(fragments)) +
    inherit("implements", ...builtinInterfaces, ...interfaces)
  );
}
