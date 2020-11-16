"use strict";

module.exports = (_ref) => {
  var {
    types: t
  } = _ref;
  return {
    visitor: {
      CallExpression(path) {
        if (t.isIdentifier(path.node.callee, {
          name: 'require'
        }) && t.isStringLiteral(path.node.arguments[0]) && path.node.arguments.length === 1) {
          var program = path.findParent(t.isProgram);
          var dependencyName = path.node.arguments[0].value; // Scenario:
          // var foo = require('bar')

          if (t.isVariableDeclarator(path.parentPath.node) && t.isIdentifier(path.parentPath.node.id)) {
            var assignedName = path.parentPath.node.id.name;

            if (t.isVariableDeclaration(path.parentPath.parentPath.node)) {
              var importName = path.scope.generateUidIdentifier(assignedName);
              program.node.body.unshift(t.importDeclaration([t.importDefaultSpecifier(importName)], t.stringLiteral(dependencyName)));
              path.parentPath.node.init = importName;
            }
          } // Scenario:
          // var foo = require('bar').baz;
          // TODO: Support chained member expressions like require('foo').bar.baz.lol
          else if (t.isMemberExpression(path.parentPath.node, {
              computed: false
            })) {
              var memberExpressionPath = path.parentPath;
              var propertyName = memberExpressionPath.node.property;

              if (t.isVariableDeclarator(memberExpressionPath.parentPath.node) && t.isIdentifier(memberExpressionPath.parentPath.node.id)) {
                var variableDeclarator = memberExpressionPath.parentPath.node;
                var _assignedName = memberExpressionPath.parentPath.node.id;

                if (t.isVariableDeclaration(memberExpressionPath.parentPath.parentPath.node)) {
                  var _importName = path.scope.generateUidIdentifierBasedOnNode(_assignedName);

                  variableDeclarator.init = _importName;
                  program.node.body.unshift(t.importDeclaration([t.importSpecifier(_importName, propertyName)], t.stringLiteral(dependencyName)));
                }
              }
            }
        }
      },

      MemberExpression(path) {
        if (t.isIdentifier(path.node.object, {
          name: 'module'
        }) && t.isIdentifier(path.node.property, {
          name: 'exports'
        })) {
          if (t.isAssignmentExpression(path.parentPath.node) && t.isExpressionStatement(path.parentPath.parentPath.node)) {
            var assignmentExpression = path.parentPath; // Scenario:
            // module.exports = require('foo');

            if (t.isCallExpression(assignmentExpression.node.right) && t.isIdentifier(assignmentExpression.node.right.callee, {
              name: 'require'
            }) && t.isStringLiteral(assignmentExpression.node.right.arguments[0]) && assignmentExpression.node.right.arguments.length === 1) {
              assignmentExpression.parentPath.replaceWith( // Output:
              // export { default } from 'foo'
              t.exportNamedDeclaration(null, [t.exportSpecifier(t.identifier('default'), t.identifier('default'))], assignmentExpression.node.right.arguments[0]) // Output:
              // export * from 'foo'
              // t.exportAllDeclaration(
              //   assignmentExpression.node.right.arguments[0]
              // )
              );
            } // Scenario:
            // module.exports = bar;
            else if (t.isExpression(assignmentExpression.node.right)) {
                assignmentExpression.parentPath.replaceWith(t.exportDefaultDeclaration(assignmentExpression.node.right));
              }
          } else if (t.isMemberExpression(path.parentPath.node)) {
            var subMemberExpression = path.parentPath;
            var namedExport = subMemberExpression.node.property;

            if (t.isAssignmentExpression(subMemberExpression.parentPath.node) && t.isExpressionStatement(subMemberExpression.parentPath.parentPath.node)) {
              var _assignmentExpression = subMemberExpression.parentPath; // Scenario:
              // module.exports.foo = require('bar');

              if (t.isCallExpression(_assignmentExpression.node.right) && t.isIdentifier(_assignmentExpression.node.right.callee, {
                name: 'require'
              }) && t.isStringLiteral(_assignmentExpression.node.right.arguments[0]) && _assignmentExpression.node.right.arguments.length === 1) {
                _assignmentExpression.parentPath.replaceWith(t.exportNamedDeclaration(null, [t.exportSpecifier(t.identifier('default'), namedExport)], _assignmentExpression.node.right.arguments[0]));
              } // Scenario:
              // module.exports.foo = bar;
              else if (t.isExpression(_assignmentExpression.node.right)) {
                  _assignmentExpression.parentPath.replaceWith(t.exportNamedDeclaration(t.variableDeclaration('var', [t.variableDeclarator(namedExport, _assignmentExpression.node.right)]), []));
                }
            }
          }
        } else if (t.isIdentifier(path.node.object, {
          name: 'exports'
        }) && t.isAssignmentExpression(path.parentPath.node)) {
          var _assignmentExpression2 = path.parentPath;
          var _namedExport = path.node.property; // Scenario:
          // exports.foo = require('bar');

          if (t.isCallExpression(_assignmentExpression2.node.right) && t.isIdentifier(_assignmentExpression2.node.right.callee, {
            name: 'require'
          }) && t.isStringLiteral(_assignmentExpression2.node.right.arguments[0]) && _assignmentExpression2.node.right.arguments.length === 1) {
            _assignmentExpression2.parentPath.replaceWith(t.exportNamedDeclaration(null, [t.exportSpecifier(t.identifier('default'), _namedExport)], _assignmentExpression2.node.right.arguments[0]));
          } else if (t.isExpression(_assignmentExpression2.node.right)) {
            // Scenario:
            // exports.default = bar;
            if (t.isIdentifier(_namedExport, {
              name: 'default'
            })) {
              _assignmentExpression2.parentPath.replaceWith(t.exportDefaultDeclaration(_assignmentExpression2.node.right));
            } // Scenario:
            // exports.foo = bar;
            else {
                _assignmentExpression2.parentPath.replaceWith(t.exportNamedDeclaration(t.variableDeclaration('var', [t.variableDeclarator(_namedExport, _assignmentExpression2.node.right)]), []));
              }
          }
        }
      }

    }
  };
};